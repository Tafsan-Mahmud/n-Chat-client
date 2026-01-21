import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { uriAuth } from './public/apiuri/uri';

/**
 * SECURE ROUTE GATEKEEPER
 * Handles Authentication and Profile Completion redirection.
 */

const PROTECTED_ROUTES = ['/chats', '/accountSetting', '/userUpdateInfo'];
const AUTH_ROUTES = ['/signin', '/register', '/authOTP', '/forgotPass'];
const UPDATE_INFO_ROUTE = '/userUpdateInfo';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;
  const validationUrl = `${uriAuth}/validate-token`;

  /**
   * Helper function to clone the current URL and change the path.
   */
  const getRedirectUrl = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    return url;
  };

  // A. Logic for PROTECTED ROUTES
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    // 1. If no token is present, redirect to signin
    if (!token) {
      return NextResponse.redirect(getRedirectUrl('/signin'), 302);
    }

    try {
      // 2. Call backend to validate token and fetch profile status
      const response = await fetch(validationUrl, {
        method: 'GET',
        headers: { 'Cookie': `token=${token}` },
      });

      // 3. Handle invalid or expired sessions
      if (response.status !== 200) {
        const redirectResponse = NextResponse.redirect(getRedirectUrl('/signin'), 302);
        redirectResponse.cookies.delete('token');
        return redirectResponse;
      }

      // 4. Extract profile status
      const data = await response.json();
      const isProfileComplete = data.isProfileComplete;

      // --- REDIRECTION ENFORCEMENT ---
      
      // If profile is NOT complete AND user is NOT on userUpdateInfo -> Force Redirect to setup
      if (!isProfileComplete && pathname !== UPDATE_INFO_ROUTE) {
        return NextResponse.redirect(getRedirectUrl(UPDATE_INFO_ROUTE), 302);
      }

      // If profile IS complete AND user tries to access userUpdateInfo manually -> Send to chats
      if (isProfileComplete && pathname === UPDATE_INFO_ROUTE) {
        return NextResponse.redirect(getRedirectUrl('/chats'), 302);
      }

      return NextResponse.next();

    } catch (err) {
      console.error('Middleware validation error:', err);
      // Fail secure: if validation fails, send to signin
      return NextResponse.redirect(getRedirectUrl('/signin'), 302);
    }
  }

  // B. Logic for AUTH ROUTES (Prevent logged-in users from seeing signin/register)
  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    if (token) {
      try {
        const response = await fetch(validationUrl, {
          method: 'GET',
          headers: { 'Cookie': `token=${token}` },
        });

        if (response.status === 200) {
          const data = await response.json();
          // Redirect based on whether their profile is finished or not
          const destination = data.isProfileComplete ? '/chats' : UPDATE_INFO_ROUTE;
          return NextResponse.redirect(getRedirectUrl(destination), 302);
        }
      } catch (err) {
        console.error('Auth route validation error:', err);
      }

      // If token exists but is invalid, clear it and allow the auth page to load
      const nextResponse = NextResponse.next();
      nextResponse.cookies.delete('token');
      return nextResponse;
    }
  }

  return NextResponse.next();
}

// 3. Matcher configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (excluding /api/auth)
     * - static files (_next/static, _next/image)
     * - public assets (images, favicon.ico)
     */
    '/((?!api/(?!auth)|_next/static|_next/image|images|favicon.ico|.*\\.png$).*)',
  ],
};