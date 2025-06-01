import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import verifyToken from '../services/auth/verifyToken';

export async function middleware(req: NextRequest) {
  const jwtToken = req.cookies.get('authToken')?.value;
  const requestedPath = req.nextUrl.pathname;

  try {
    const response = await verifyToken(jwtToken);
    if (response && response.statusCode === 200) {
      const userRole = response.user.role;
      if (userRole === 'USER' && requestedPath.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      return NextResponse.next();
    } else {
      console.error('Invalid Token.');
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
