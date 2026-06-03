"use server";

import { revalidatePath } from "next/cache";
import { addNewBlog, addToReadingList, likeBlog, markAsRead } from "../services/blogs";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

type FormErrors = {
  title?: string[];
  author?: string[];
  url?: string[];
};

type State = {
  errors?: FormErrors;
  message?: string;
  fields?: {
    title: string;
    author: string;
    url: string;
  };
  success?: boolean;
};

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

export async function createBlogAction(
  prevState: State,

  formData: FormData,
): Promise<State> {
  const session = await auth();

  if (!session?.user?.id) {
    console.log("kusee");
    redirect("/login");
  }

  const rawData = {
    title: String(formData.get("title") ?? ""),

    author: String(formData.get("author") ?? ""),

    url: String(formData.get("url") ?? ""),
  };

  const { title, author, url } = rawData;
  const errors: FormErrors = {};

  if (title.length < 5) {
    errors.title = ["Title must be at least 5 char long"];
  }

  if (author.length < 5) {
    errors.author = ["Author must be at least 5 char long"];
  }

  if (url.length < 5) {
    errors.url = ["url must be at least 5 char long"];
  }

  if (Object.keys(errors).length > 0) {
    return { errors, fields: rawData };
  }

  const userId = session.user.id;

  try {
    const blog = await addNewBlog({
      title,
      author,
      url,
      likes: "0",
      userId: Number(userId),
    });

    if (blog) {
      await addToReadingList(Number(userId), blog.id);
    }

    revalidatePath("/blogs");

    return { success: true, fields: rawData };
  } catch {
    return {
      message: "Failed to create blog",
      fields: rawData,
    };
  }
}

export async function addToReadingListAction(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const blogIdValue = formData.get("blogId");
  const blogId = typeof blogIdValue === "string" ? Number(blogIdValue) : NaN;

  if (!Number.isFinite(blogId)) {
    return;
  }

  await addToReadingList(Number(session.user.id), blogId);

  revalidatePath(`/blogs/${blogId}`);
}

export async function markAsReadAction(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const idValue = formData.get("id");
  const id = typeof idValue === "string" ? Number(idValue) : NaN;

  if (!Number.isFinite(id)) {
    return;
  }

  await markAsRead(id);

  revalidatePath("/me");
}
