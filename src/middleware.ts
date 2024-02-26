import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuthenticated = !!req.auth?.user;
  const startsWithHome = req.nextUrl.pathname.startsWith("/home");

  if (!isAuthenticated && startsWithHome) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isLandingPage = req.nextUrl.pathname === "/";

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  if (isAuthenticated && (isAuthPage || isLandingPage)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
