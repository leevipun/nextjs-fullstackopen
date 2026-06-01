"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addNewBlog, likeBlog } from "../services/blogs";

export async function likeBlogAction(formData: FormData) {
  const idValue = formData.get("id");
  const id = typeof idValue === "string" ? Number(idValue) : NaN;

  if (!Number.isFinite(id)) {
    return;
  }

  const updated = await likeBlog(id);

  if (updated) {
    revalidatePath(`/blogs/${id}`);
    revalidatePath("/blogs");
  }
}

export async function createBlogAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  if (!title || !author || !url) {
    return;
  }

  await addNewBlog({
    title,
    author,
    url,
    likes: "0",
    userId: 1,
  });

  revalidatePath("/blogs");
  redirect("/blogs");
}
