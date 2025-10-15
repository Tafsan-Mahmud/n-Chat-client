import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Define the protected and public routes based on your file structure
const PROTECTED_ROUTES = ['/chats', '/accountSetting'];
const AUTH_ROUTES = ['/signin', '/register', '/authOTP', '/forgotPass'];

// 2. Main Middleware Function
export function middleware(request: NextRequest) {
  // Get the 'token' cookie set by your Express backend
  const token = request.cookies.get('token')?.value;
  
  // Get the path the user is currently trying to access
  const pathname = request.nextUrl.pathname;

  // --- A. Check if the user is trying to access a Protected Route (e.g., /chats) ---
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    // If the cookie/token is missing, redirect them to the sign-in page
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
    // If token exists, allow access
    return NextResponse.next();
  }

  // --- B. Check if the user is trying to access an Auth Route (e.g., /signin) ---
  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    // If the token exists, they shouldn't be on the sign-in/register page, so redirect them to the main app area
    if (token) {
      const url = request.nextUrl.clone();
      url.pathname = '/chats'; // Redirect to the main authenticated area
      return NextResponse.redirect(url);
    }
    // If token is missing, allow access to auth pages
    return NextResponse.next();
  }

  // Allow access to all other paths (e.g., '/', '/api', '/components', etc.)
  return NextResponse.next();
}

// 3. Define the matcher configuration
// This runs the middleware only on the necessary paths to avoid slowing down static assets.
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - API routes (/api/...)
     * - Next.js static files (_next/static/...)
     * - Images and other assets (.*\\.png$, etc.)
     * - Root files like favicon.ico, etc.
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.png$).*)',
  ],
};
