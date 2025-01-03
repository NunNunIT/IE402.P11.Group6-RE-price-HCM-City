import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { NextAuthConfig } from "next-auth";


export const authConfig: NextAuthConfig = {
  providers: [Github, Google],
}