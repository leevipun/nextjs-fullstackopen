CREATE TABLE IF NOT EXISTS "reading_list" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "blog_id" integer NOT NULL REFERENCES "blogs"("id"),
  CONSTRAINT "reading_list_user_id_blog_id_unique" UNIQUE("user_id", "blog_id")
);
