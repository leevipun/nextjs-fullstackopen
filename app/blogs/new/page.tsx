"use client";

import { Blog, Hardblogs } from "@/app/assets/data";
import { addNewBlog } from "@/app/services/blogs";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function NewBlog() {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const handleSubmit = () => {
    const newBlog: Blog = {
      id: Hardblogs.length + 1,
      title: title,
      author: author,
      url: url,
      likes: 0,
    };
    addNewBlog(newBlog);
    redirect("/blogs");
  };

  return (
    <form action={handleSubmit} className="mx-auto w-full max-w-xl px-6 py-10">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          New blog
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Share something worth reading.
        </p>

        <div className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="author" className="text-sm font-medium">
              Author
            </label>
            <input
              id="author"
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="url" className="text-sm font-medium">
              Url
            </label>
            <input
              id="url"
              type="text"
              placeholder="Url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
