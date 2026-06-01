"use client";

import Link from "next/link";
import { Blog } from "@/app/assets/data";
import { use, useEffect, useState } from "react";
import { User } from "@/app/assets/data";
import { getUserByUsernameAction } from "@/app/actions/users";

type UserWithBlogs = User & { blogs?: Blog[] };

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const userName = id;
  const [user, setUser] = useState<UserWithBlogs | null>(null);
  const [status, setStatus] = useState<
    "loading" | "ready" | "not-found" | "error"
  >("loading");

  useEffect(() => {
    let isActive = true;

    async function loadUser() {
      try {
        setStatus("loading");
        const data = await getUserByUsernameAction(userName);

        if (!isActive) {
          return;
        }

        if (!data) {
          setStatus("not-found");
          return;
        }

        setUser(data as UserWithBlogs);
        setStatus("ready");
      } catch (error) {
        if (!isActive) {
          return;
        }

        setStatus("error");
      }
    }

    loadUser();

    return () => {
      isActive = false;
    };
  }, [userName]);

  const blogs: Blog[] = Array.isArray(user?.blogs) ? user.blogs : [];

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {user?.name ?? "Unknown user"}
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            @{user?.username ?? "unknown"} · {blogs.length} posts
          </p>
        </div>
        <Link href="/users" className="text-sm text-zinc-500">
          Back to users
        </Link>
      </div>

      {status === "loading" && (
        <p className="text-sm text-zinc-500">Loading profile...</p>
      )}
      {status === "not-found" && (
        <p className="text-sm text-zinc-500">User not found.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-zinc-500">Something went wrong.</p>
      )}

      {status === "ready" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.length === 0 ? (
            <p className="text-sm text-zinc-500">No posts yet.</p>
          ) : (
            blogs.map((blog: Blog) => (
              <Link
                href={`/blogs/${blog.id}`}
                key={blog.id}
                className="group block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {blog.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {blog.author}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 group-hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:group-hover:bg-zinc-700">
                  {blog.likes} likes
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
