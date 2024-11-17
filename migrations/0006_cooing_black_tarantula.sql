ALTER TABLE "categories" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "communities" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "discussions" ALTER COLUMN "title" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "papers" ALTER COLUMN "title" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "papers" ALTER COLUMN "author" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "emoji" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
