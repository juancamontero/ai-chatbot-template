import NextAuth, { type DefaultSession, type NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import GithubProvider from "next-auth/providers/github"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!
      }
      return session
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id
      }
      return token
    }
  }
} satisfies NextAuthConfig

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig) 