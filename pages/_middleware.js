import {getToken} from 'next-auth/jwt';
import {NextResponse} from 'next/server';
export async function middleware(req) {
  // Token exists if user logged in
  const token = await getToken({req, secret: process.env.JWT_SECRET});

  // Allow requests if the follwing is true

  // If its a request for next-auth session
  // if token exists

  const {pathname} = req.nextUrl;
  if (pathname.includes('/api/auth') || token) {
    if (pathname == '/login') {
      return NextResponse.redirect('/');
    }
    return NextResponse.next();
  }
  //   Redirect to login if they dont have a token and are fetching a protected route

  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }
}
