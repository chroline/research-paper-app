"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { AuthError } from "next-auth";

import { userCredentials, users } from "@/db/schema";

export async function handleSignOut() {
  await signOut();
}

export async function handleSignIn(email: string, password: string) {
  try {
    await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    return { success: true };
  } catch (e) {
    if (e instanceof AuthError) {
      return { success: false, error: e.type };
    } else {
      return { success: false, error: null };
    }
  }
}

export async function handleSignUp(name: string, email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  const [{ id: userId }] = await db.insert(users).values({ email, name }).returning({ id: users.id });
  await db.insert(userCredentials).values({ userId, type: "password", data: hash }).returning({ id: users.id });

  return await handleSignIn(email, password);
}
