import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    authorized: async ({ auth }) => !!auth,
    redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.sub,
        name: token.name,
        email: token.email,
        image: token.picture,
        emailVerified: null,
      };

      return session;
    },
  },
});
