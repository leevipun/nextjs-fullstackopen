import { db } from "@/db";
import { blogs as blogsTable } from "@/db/schema";
import { desc, eq, ilike, sql } from "drizzle-orm";
import { Blog } from "../assets/data";

type NewBlog = Omit<Blog, "id">;

function mapBlog(row: typeof blogsTable.$inferSelect): Blog {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    url: row.url,
    likes: String(row.likes) ? String(row.likes) : "0",
    userId: row.userId,
  };
}

export async function getBlogs(filter?: string) {
  const normalizedFilter = filter?.trim();
  const rows = normalizedFilter
    ? await db
        .select()
        .from(blogsTable)
        .where(ilike(blogsTable.title, `%${normalizedFilter}%`))
        .orderBy(desc(blogsTable.likes))
    : await db.select().from(blogsTable).orderBy(desc(blogsTable.likes));
  return rows.map(mapBlog);
}

export async function getBlogById(id: number) {
  const rows = await db
    .select()
    .from(blogsTable)
    .where(eq(blogsTable.id, id))
    .limit(1);

  return rows[0] ? mapBlog(rows[0]) : null;
}

export async function addNewBlog(blog: NewBlog) {
  const [inserted] = await db
    .insert(blogsTable)
    .values({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes != null ? String(blog.likes) : "0",
      userId: blog.userId ?? null,
    })
    .returning();

  return inserted ? mapBlog(inserted) : null;
}

export async function likeBlog(id: number) {
  const [updated] = await db
    .update(blogsTable)
    .set({
      likes: sql`${blogsTable.likes} + 1`,
    })
    .where(eq(blogsTable.id, id))
    .returning();

  return updated ? mapBlog(updated) : null;
}
