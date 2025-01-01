import { ENUM_SOCIAL_TYPE } from "@/utils";
import NextAuth from "next-auth";
import { authConfig } from "./config";
import { createUserFromSocial } from "../services";
import Credentials from "next-auth/providers/credentials"
import { User } from "../model/user.model";
import bcrypt from "bcryptjs";


const authorize = async ({ email, password }: ICredentials) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(password, user.password ?? "");
    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (error) {
    console.error(">> Error in login:", error.message);
    return null;
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [...authConfig.providers, Credentials({
    name: "Admin Login",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize,
  })],
  callbacks: {
    authorized: async ({ auth }) => !!auth,
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    jwt: async ({ token, user, account }) => {
      if (user && account.provider === "google") {
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
      }

      if (user && account.provider === "credentials") {
        token = {
          ...token,
          _id: user._id.toString(),
          name: user.username,
          picture: user.avt,
          role: user.role
        };
      }

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
