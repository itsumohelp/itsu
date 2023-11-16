import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
  }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async session({session, user}) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
}

export default NextAuth(authOptions)