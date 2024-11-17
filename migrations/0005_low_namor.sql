ALTER TABLE "tags" RENAME TO "categories";--> statement-breakpoint
ALTER TABLE "paper_tags" RENAME TO "paper_categories";--> statement-breakpoint
ALTER TABLE "paper_categories" RENAME COLUMN "tag_id" TO "category_id";--> statement-breakpoint
ALTER TABLE "paper_categories" DROP CONSTRAINT "paper_tags_paper_id_papers_id_fk";
--> statement-breakpoint
ALTER TABLE "paper_categories" DROP CONSTRAINT "paper_tags_tag_id_tags_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "paper_categories" ADD CONSTRAINT "paper_categories_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "paper_categories" ADD CONSTRAINT "paper_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
