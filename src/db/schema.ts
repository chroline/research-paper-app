import { boolean, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const papers = pgTable("papers", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  publishedYear: integer("published_year").notNull(),
  abstract: text("abstract"),
  keywords: text("keywords").array().notNull(),
});

export const discussions = pgTable("discussions", {
  id: uuid("id").primaryKey().defaultRandom(),
  paperId: uuid("paper_id")
    .references(() => papers.id)
    .notNull(),
  communityId: uuid("community_id")
    .references(() => communities.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  isPublic: boolean("is_public").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const communities = pgTable("communities", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userCredentials = pgTable("user_credentials", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  type: text("type").notNull(),
  data: text("data").notNull(),
});

export const replies = pgTable("replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  discussionId: uuid("discussion_id")
    .references(() => discussions.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const featured = pgTable("featured", {
  id: uuid("id").primaryKey().defaultRandom(),
  paperId: uuid("paper_id")
    .references(() => papers.id, { onDelete: "cascade" })
    .notNull(),
  featuredAt: timestamp("featured_at").notNull().defaultNow(),
});

export const statusEnum = pgEnum("status_enum", ["want to read", "reading", "finished"]);

export const userPaperStatus = pgTable("user_paper_status", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  paperId: uuid("paper_id")
    .references(() => papers.id, { onDelete: "cascade" })
    .notNull(),
  status: statusEnum("status").notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  emoji: text("emoji").notNull(),
});

export const paperCategories = pgTable("paper_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  paperId: uuid("paper_id")
    .references(() => papers.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
});

export const communityUsers = pgTable("community_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  communityId: uuid("community_id")
    .references(() => communities.id, { onDelete: "cascade" })
    .notNull(),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
});
