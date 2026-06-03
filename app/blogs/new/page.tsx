"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogAction } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/notificationContext";

export default function NewBlog() {
  const router = useRouter();
  const [state, formAction] = useActionState(createBlogAction, {
    errors: undefined,
    message: undefined,
    fields: undefined,
  });
  const { showNotification } = useNotification();

  const [fields, setFields] = useState({ title: "", author: "", url: "" });

  useEffect(() => {
    if (state?.success) {
      showNotification("Blog created successfully");
      router.push("/blogs");
    } else if (state?.fields) {
      setFields(state.fields);
    }
  }, [state, showNotification, router]);

  return (
    <form action={formAction} className="mx-auto w-full max-w-xl px-6 py-10">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold">New blog</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Share something worth reading.
        </p>

        <div className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <label>
              Title
              <input
                name="title"
                className="input"
                value={fields.title}
                onChange={(e) =>
                  setFields((f) => ({ ...f, title: e.target.value }))
                }
              />
            </label>
            {state?.errors?.title && (
              <p className="text-sm text-red-500">{state.errors.title[0]}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label>
              Author
              <input
                name="author"
                className="input"
                value={fields.author}
                onChange={(e) =>
                  setFields((f) => ({ ...f, author: e.target.value }))
                }
              />
            </label>
            {state?.errors?.author && (
              <p className="text-sm text-red-500">{state.errors.author[0]}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label>
              URL
              <input
                name="url"
                className="input"
                value={fields.url}
                onChange={(e) =>
                  setFields((f) => ({ ...f, url: e.target.value }))
                }
              />
            </label>
            {state?.errors?.url && (
              <p className="text-sm text-red-500">{state.errors.url[0]}</p>
            )}
          </div>
        </div>

        {state?.message && (
          <p className="mt-4 text-sm text-red-500">{state.message}</p>
        )}

        <button
          type="submit"
          data-testid="create-blog-button"
          className="mt-6 rounded-full bg-black px-4 py-2 text-white"
        >
          Create
        </button>
      </div>
    </form>
  );
}
