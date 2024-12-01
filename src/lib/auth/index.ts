import { ENUM_SOCIAL_TYPE } from "@/utils";
import NextAuth from "next-auth";
import { authConfig } from "./config";
import { createUserFromSocial } from "../services";

export { authConfig };
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    authorized: async ({ auth }) => !!auth,
    redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    jwt: async ({ token }) => {
      const { _id } = await createUserFromSocial({
        email: token.email,
        socialType: token.provider as ENUM_SOCIAL_TYPE,
        metadata: {
          username: token.name,
          avt: token.picture,
        },
      })

      token._id = _id;

      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: (token._id as string),
        name: token.name,
        email: token.email,
        image: token.picture,
        emailVerified: undefined,
      };

      return session;
    },
  },
});
