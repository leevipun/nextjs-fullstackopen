import { db } from "@/db";
import {
  blogs as blogsTable,
  readingList as readingListTable,
} from "@/db/schema";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import { Blog } from "../assets/data";

export type ReadingListItem = {
  id: number;
  read: boolean;
  blog: Blog;
};

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

export async function addToReadingList(userId: number, blogId: number) {
  const [inserted] = await db
    .insert(readingListTable)
    .values({ userId, blogId })
    .returning();
  return inserted ?? null;
}

export async function isInReadingList(
  userId: number,
  blogId: number,
): Promise<boolean> {
  const rows = await db
    .select()
    .from(readingListTable)
    .where(
      and(
        eq(readingListTable.userId, userId),
        eq(readingListTable.blogId, blogId),
      ),
    )
    .limit(1);
  return rows.length > 0;
}

export async function getReadingList(
  userId: number,
): Promise<ReadingListItem[]> {
  const rows = await db
    .select({
      id: readingListTable.id,
      read: readingListTable.read,
      blog: blogsTable,
    })
    .from(readingListTable)
    .innerJoin(blogsTable, eq(readingListTable.blogId, blogsTable.id))
    .where(eq(readingListTable.userId, userId));

  return rows.map((row) => ({
    id: row.id,
    read: row.read,
    blog: {
      id: row.blog.id,
      title: row.blog.title,
      author: row.blog.author,
      url: row.blog.url,
      likes: String(row.blog.likes) ? String(row.blog.likes) : "0",
      userId: row.blog.userId,
    },
  }));
}

export async function markAsRead(readingListId: number) {
  const [updated] = await db
    .update(readingListTable)
    .set({ read: true })
    .where(eq(readingListTable.id, readingListId))
    .returning();
  return updated ?? null;
}
