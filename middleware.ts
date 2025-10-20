import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { uriAuth } from './public/apiuri/uri';

const PROTECTED_ROUTES = ['/chats', '/accountSetting'];
const AUTH_ROUTES = ['/signin', '/register', '/authOTP', '/forgotPass'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;
  const validationUrl = `${uriAuth}/validate-token`;

  // A. Protected routes
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url, 302);
    }

    let isValid = false;
    try {
      const response = await fetch(validationUrl, {
        method: 'GET',
        headers: { 'Cookie': `token=${token}` },
      });
      if (response.status === 200) isValid = true;
    } catch (err) {
      console.error('Token validation error:', err);
    }

    if (!isValid) {
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      const redirectResponse = NextResponse.redirect(url, 302);
      redirectResponse.cookies.delete('token');
      return redirectResponse;
    }

    return NextResponse.next();
  }

  // B. Auth routes
  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    if (token) {
      let isValid = false;
      try {
        const response = await fetch(validationUrl, {
          method: 'GET',
          headers: { 'Cookie': `token=${token}` },
        });
        if (response.status === 200) isValid = true;
      } catch (err) {
        console.error('Token validation error:', err);
      }

      if (isValid) {
        const url = request.nextUrl.clone();
        url.pathname = '/chats';
        return NextResponse.redirect(url, 302);
      }

      const nextResponse = NextResponse.next();
      nextResponse.cookies.delete('token');
      return nextResponse;
    }

    return NextResponse.next();
  }

  // C. Everything else
  return NextResponse.next();
}

// 3. Define the matcher configuration
export const config = {
  matcher: [
    // Matches all request paths except for files, static assets, and APIs (excluding /api/auth)
    '/((?!api/(?!auth)|_next/static|_next/image|images|favicon.ico|.*\\.png$).*)',
  ],
};


// const validationUrl = `${uriAuth}/validate-token`;