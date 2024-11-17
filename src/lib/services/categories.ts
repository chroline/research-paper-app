"use server";

import { db } from "@/db";
import { count, eq } from "drizzle-orm";

import { categories, paperCategories, papers } from "@/db/schema";

export async function getCategoriesByUserId(userId: string) {
  return db.select().from(categories).where(eq(categories.userId, userId));
}

export async function countPapersInCategory(categoryId: string) {
  return db
    .select({ count: count() })
    .from(paperCategories)
    .innerJoin(papers, eq(paperCategories.paperId, papers.id))
    .innerJoin(categories, eq(paperCategories.categoryId, categories.id))
    .where(eq(categories.id, categoryId))
    .then(v => v[0]?.count);
}

export async function createCategory({ name, emoji, userId }: { name: string; emoji: string; userId: string }) {
  return db.insert(categories).values([{ name, emoji, userId }]).returning({ id: categories.id });
}

export async function getCategoryById(categoryId: string) {
  return db
    .select()
    .from(categories)
    .where(eq(categories.id, categoryId))
    .then(v => v[0]);
}
