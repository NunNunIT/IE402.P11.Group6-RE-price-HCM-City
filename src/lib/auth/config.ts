import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { NextAuthConfig } from "next-auth";
import { User } from "../model";
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


export const authConfig: NextAuthConfig = {
  providers: [Github, Google, Credentials({
    name: "Admin Login",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize,
  })],
}