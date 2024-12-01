import NextAuth from "next-auth";
import { authConfig } from "./lib/auth/config";

const middleware = NextAuth(authConfig).auth;

export default middleware;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}