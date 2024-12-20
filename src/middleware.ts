import NextAuth from "next-auth";
import { NextAuthRequest } from "node_modules/next-auth/lib";
import { NextResponse } from "next/server";
import { authConfig } from "./lib/auth/config";

const privatePages: string[] = ["/user/*", "/create-new-re", "/admin/*"];

let socketInitialized = false;

const checkPathnameRegex = (pages: string[], pathName: string): boolean => {
  const pagesRegex = pages
    .flatMap((p) => {
      if (p.endsWith("/*")) {
        const newP = p.slice(0, -2);
        // Escape special characters in the base route
        const escapedNewP = newP.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return [`${escapedNewP}`, `${escapedNewP}/.*`]; // Match base and wildcard routes
      }
      // Escape special characters in non-wildcard paths
      const escapedP = p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return p === "/" ? ["", "/"] : escapedP;
    })
    .join("|");

  const regex = new RegExp(`^(${pagesRegex})/?$`, "i");
  return regex.test(pathName);
};

const middleware = NextAuth(authConfig).auth((req: NextAuthRequest) => {
  const { pathname, origin } = req.nextUrl;
  const auth = req.auth;

  const isPrivatePage = checkPathnameRegex(privatePages, pathname);
  if (isPrivatePage && !auth)
    return NextResponse.redirect(
      `${origin}/api/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`,
      302
    );

  return NextResponse.next();
});

export default middleware;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
