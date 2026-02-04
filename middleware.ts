import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { uriAuth } from './public/apiuri/uri';

const PROTECTED_ROUTES = ['/chats', '/accountSetting', '/userUpdateInfo'];
const AUTH_ROUTES = ['/signin', '/register', '/authOTP', '/forgotPass'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const otpPending = request.cookies.get('otp_pending')?.value;
  const pathname = request.nextUrl.pathname;

  const validationUrl = `${uriAuth}/validate-token`;

  const isProtected = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  const isAuthRoute = AUTH_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  // ─────────────────────────────────────
  //  Forgot Password PAGE GUARD (VERY IMPORTANT)
  // ─────────────────────────────────────


  if (pathname.startsWith('/forgotPass')) {
    const forgotAllowed = request.cookies.get('forgot_allowed')?.value;

    if (!forgotAllowed) {
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ─────────────────────────────────────
  //  Forgot Password PAGE GUARD (VERY IMPORTANT)
  // ─────────────────────────────────────




  // ─────────────────────────────────────
  //  OTP PAGE GUARD (VERY IMPORTANT)
  // ─────────────────────────────────────
  if (pathname.startsWith('/authOTP')) {
    // Logged-in users can NEVER access OTP page
    if (token) {
      const url = request.nextUrl.clone();
      url.pathname = '/chats';
      return NextResponse.redirect(url);
    }

    // OTP page only allowed if backend issued otp_pending
    if (!otpPending) {
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }
  // ─────────────────────────────
  // A. PROTECTED ROUTES
  // ─────────────────────────────
  if (isProtected) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }

    try {
      const response = await fetch(validationUrl, {
        headers: { Cookie: `token=${token}` },
        cache: "no-store",
      });

      //  invalid / expired / forged token
      if (response.status !== 200) {
        const url = request.nextUrl.clone();
        url.pathname = '/signin';
        const res = NextResponse.redirect(url);
        res.cookies.delete('token'); //  cleanup bad cookie
        res.cookies.delete('hasSession'); //  cleanup bad cookie
        return res;
      }

      const { isProfileComplete } = await response.json();

      //  force profile completion
      if (!isProfileComplete && !pathname.startsWith('/userUpdateInfo')) {
        const url = request.nextUrl.clone();
        url.pathname = '/userUpdateInfo';
        return NextResponse.redirect(url);
      }

      //  block profile page after completion
      if (isProfileComplete && pathname.startsWith('/userUpdateInfo')) {
        const url = request.nextUrl.clone();
        url.pathname = '/chats';
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    } catch {
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
  }

  // ─────────────────────────────
  // B. AUTH ROUTES (signin, signup)
  // ─────────────────────────────
  if (isAuthRoute && token) {
    try {
      const response = await fetch(validationUrl, {
        headers: { Cookie: `token=${token}` },
      });

      if (response.status === 200) {
        const { isProfileComplete } = await response.json();
        const url = request.nextUrl.clone();
        url.pathname = isProfileComplete ? '/chats' : '/userUpdateInfo';
        return NextResponse.redirect(url);
      }

      //  bad token on auth routes → clean it
      const res = NextResponse.next();
      res.cookies.delete('token');
      res.cookies.delete('hasSession');
      return res;
    } catch {
      const res = NextResponse.next();
      res.cookies.delete('token');
      res.cookies.delete('hasSession');
      return res;
    }
  }

  // ─────────────────────────────
  // C. EVERYTHING ELSE
  // ─────────────────────────────
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!api/(?!auth)|_next/static|_next/image|images|favicon.ico|.*\\.png$).*)',
  ],
};
