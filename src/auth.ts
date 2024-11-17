import { db } from "@/db";
import { compare } from "bcrypt-ts";
import { and, eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { userCredentials, users } from "@/db/schema";

import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }: any) {
        const user = await db.select().from(users).where(eq(users.email, email));

        if (user.length === 0) return false;

        const credentials = await db
          .select()
          .from(userCredentials)
          .where(and(eq(userCredentials.userId, user[0].id), eq(userCredentials.type, "password")));

        if (credentials.length === 0) return false;

        const passwordsMatch = await compare(password, credentials[0].data!);

        if (!passwordsMatch) return false;

        return user[0] as any;
      },
    }),
  ],
});
