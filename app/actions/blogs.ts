"use server";

import { revalidatePath } from "next/cache";
import { likeBlog } from "../services/blogs";

export async function likeBlogAction(formData: FormData) {
  const idValue = formData.get("id");
  const id = typeof idValue === "string" ? Number(idValue) : NaN;

  if (!Number.isFinite(id)) {
    return;
  }

  const updated = likeBlog(id);

  if (updated) {
    revalidatePath(`/blogs/${id}`);
    revalidatePath("/blogs");
  }
}
