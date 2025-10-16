import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Define the routes
const PROTECTED_ROUTES = ['/chats', '/accountSetting'];
const AUTH_ROUTES = ['/signin', '/register', '/authOTP', '/forgotPass'];

// 2. Main Middleware Function
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  // --- A. Check if the user is trying to access a Protected Route ---
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {

    // 1. Presence Check (Quick fail if token is missing)
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }

    // 2. Validation Check (CRITICAL SECURITY STEP)
    // NOTE: Use the absolute URL for the fetch call
    const validationUrl = `${request.nextUrl.origin}/api/auth/validate-token`;

    // IMPORTANT: We must forward the cookies received from the client to the backend API
    const response = await fetch(validationUrl, {
      method: 'GET',
      headers: {
        'Cookie': `token=${token}`,
      },
    });

    // If the backend returns anything other than 200, the token is BAD (forged/expired).
    if (response.status !== 200) {
      console.log("Token validation failed in backend. Redirecting to signin and clearing cookie.");
      const url = request.nextUrl.clone();
      url.pathname = '/signin';

      // Clear the bad token cookie before redirecting
      const redirectResponse = NextResponse.redirect(url);
      redirectResponse.cookies.delete('token');
      return redirectResponse;
    }

    // If response.status is 200, the token is valid.
    return NextResponse.next();
  }

  // --- B. Check if the user is trying to access an Auth Route ---
  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    if (token) {
      const validationUrl = `${request.nextUrl.origin}/api/auth/validate-token`;
      const response = await fetch(validationUrl, {
        method: 'GET',
        headers: { 'Cookie': `token=${token}` },
      });

      // If the token is valid (200), redirect them away from signin/register pages.
      if (response.status === 200) {
        const url = request.nextUrl.clone();
        url.pathname = '/chats';
        return NextResponse.redirect(url);
      }

//  Token is present but BAD (e.g., 401/403). Clear the bad cookie.
      if (response.status !== 200) {
        console.log("Auth page visited with invalid token. Clearing cookie.");

        // Allow access to the auth page, but remove the bad token first.
        const nextResponse = NextResponse.next();
        nextResponse.cookies.delete('token');
        return nextResponse;
      }
    }
    // If no token exists, or if the bad token was just cleared above, allow access.
    return NextResponse.next();
  }

  // Allow access to all other paths
  return NextResponse.next();
}

// 3. Define the matcher configuration
export const config = {
  matcher: [
    // Matches all request paths except for files, static assets, and APIs (excluding /api/auth)
    '/((?!api/(?!auth)|_next/static|_next/image|images|favicon.ico|.*\\.png$).*)',
  ],
};
