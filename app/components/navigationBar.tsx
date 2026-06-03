"use client";

import Link from "next/link";

import { logoutAction } from "@/app/actions/auth";
import { useSession } from "next-auth/react";

export default function NavigationBar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-sm font-medium">
        <ul className="flex list-none items-center gap-4">
          <li>
            <Link
              href="/"
              className="rounded-full px-3 py-1 text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              home
            </Link>
          </li>
          <li className="flex items-center gap-4">
            <Link
              href="/blogs"
              className="rounded-full px-3 py-1 text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              blogs
            </Link>
            <Link
              href="/users"
              className="rounded-full px-3 py-1 text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              users
            </Link>
          </li>
          <li>
            <Link
              href="/blogs/new"
              className="rounded-full bg-zinc-900 px-3 py-1 text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              New
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/me"
                className="rounded-full px-3 py-1 text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                me
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-full border border-zinc-200 px-3 py-1 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-3 py-1 text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                login
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-zinc-200 px-3 py-1 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
