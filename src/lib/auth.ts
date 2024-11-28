import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    authorized: async ({ auth }) => !!auth,
    redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    session: async ({ session, token }) => {
      // Add Google user data to the session object
      if (token?.provider === 'google') {
        session.user = {
          id: token.sub,
          email: token.email,
          name: token.name,
          image: token.picture,
          emailVerified: null, // or provide a valid date if available
        };
      }

      // Add GitHub user data to the session object
      if (token?.provider === 'github') {
        session.user = {
          id: token.sub,
          email: token.email,
          name: token.name,
          image: token.picture,
          emailVerified: null, // or provide a valid date if available
        };
      }
      return session;
    },
  },
});