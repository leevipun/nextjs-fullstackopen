import Link from "next/link";

import { auth } from "@/auth";
import { logoutAction } from "@/app/actions/auth";

export default async function NavigationBar() {
  const session = await auth();
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
              Home
            </Link>
          </li>
          <li className="flex items-center gap-4">
            <Link
              href="/blogs"
              className="rounded-full px-3 py-1 text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              Blogs
            </Link>
            <Link
              href="/users"
              className="rounded-full px-3 py-1 text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              Users
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
              <span className="text-zinc-600 dark:text-zinc-300">
                {user.name ?? user.username}
              </span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-full border border-zinc-200 px-3 py-1 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-3 py-1 text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-zinc-200 px-3 py-1 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
