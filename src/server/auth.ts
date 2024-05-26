import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'

import { db } from '@/server/db'
import { type UserStatus, type Role } from '@prisma/client'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      username: string
      isVerified: boolean
      phoneNumber: string
      status: UserStatus
      role: Role
      // ...other properties
    } & DefaultSession['user']
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session?.user,
          ...token,
        },
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          ...user,
        }
      }

      return token
    },
  },
  providers: [
    Credentials({
      name: 'Sign In',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter yout username',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        // Handle auth
        if (!credentials?.username || !credentials.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: { username: credentials.username },
          include: { role: true },
        })
        if (!user) return null

        const passwordMatch = await compare(credentials.password, user.password)
        if (!passwordMatch) return null

        return {
          id: user.id + '',
          name: user.name,
          username: user.username,
          email: user.email,
          image: user.image,
          role: user.role,
          isVerified: user.isVerified,
          phoneNumber: user.phoneNumber,
          status: user.status,
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  debug: true,
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
