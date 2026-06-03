import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, blogs } from "@/db/schema";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.slice(7);

  const [user] = await db
    .select({ id: users.id, name: users.name, username: users.username })
    .from(users)
    .where(eq(users.token, token))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userBlogs = await db
    .select({ id: blogs.id, title: blogs.title, author: blogs.author, url: blogs.url, likes: blogs.likes })
    .from(blogs)
    .where(eq(blogs.userId, user.id));

  return NextResponse.json({ ...user, blogs: userBlogs });
}
