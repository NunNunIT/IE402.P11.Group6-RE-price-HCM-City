import { ENUM_SOCIAL_TYPE } from "@/utils";
import NextAuth from "next-auth";
import { authConfig } from "./config";
import { createUserFromSocial } from "../services";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    authorized: async ({ auth }) => !!auth,
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    jwt: async ({ token }) => {
      const { _id, role, avt } = await createUserFromSocial({
        email: token.email,
        socialType: token.provider as ENUM_SOCIAL_TYPE,
        metadata: {
          username: token.name,
          avt: token.picture,
        },
      })

      token._id = _id.toString();
      token.role = role;
      token.picture = avt;

      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: (token._id as string),
        name: token.name,
        email: token.email,
        image: token.picture,
        emailVerified: undefined,
        role: token.role,
      };

      return session;
    },
  },
});
