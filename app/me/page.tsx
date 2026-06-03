import { redirect } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { generateTokenAction } from "@/app/actions/users";
import { getReadingList } from "@/app/services/blogs";
import { markAsReadAction } from "@/app/actions/blogs";

export default async function MePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [user] = await db
    .select({ name: users.name, username: users.username, token: users.token })
    .from(users)
    .where(eq(users.id, Number(session.user.id)))
    .limit(1);

  if (!user) {
    redirect("/login");
  }

  const readingList = await getReadingList(Number(session.user.id));
  const unread = readingList.filter((item) => !item.read);
  const read = readingList.filter((item) => item.read);

  return (
    <div className="mx-auto w-full max-w-xl px-6 py-10">
      <div data-testid="user-profile" className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold">My Profile</h1>

        <div className="mt-6 grid gap-4">
          <div>
            <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Name</label>
            <p data-testid="user-name" className="mt-1 text-zinc-900 dark:text-zinc-100">{user.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Username</label>
            <p data-testid="user-username" className="mt-1 text-zinc-900 dark:text-zinc-100">{user.username}</p>
          </div>
        </div>

        <div data-testid="api-token-section" className="mt-8">
          <h2 className="text-lg font-semibold">API Token</h2>

          {user.token ? (
            <div data-testid="token-display" className="mt-2">
              <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Current token</label>
              <p data-testid="api-token" className="mt-1 break-all rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {user.token}
              </p>
            </div>
          ) : (
            <p data-testid="no-token-message" className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              No token has been generated yet.
            </p>
          )}

          <form action={generateTokenAction} className="mt-4">
            <button
              type="submit"
              data-testid="generate-token-button"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Generate new token
            </button>
          </form>
        </div>
      </div>

      <div data-testid="reading-list-section" className="mt-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Reading List
        </h2>

        {readingList.length === 0 && (
          <p data-testid="empty-reading-list" className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Your reading list is empty.
          </p>
        )}

        {unread.length > 0 && (
          <div data-testid="unread-section" className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Unread ({unread.length})
            </h3>
            <ul className="mt-3 space-y-3">
              {unread.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/blogs/${item.blog.id}`}
                      className="text-sm font-semibold text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
                    >
                      {item.blog.title}
                    </Link>
                    <p className="mt-0.5 truncate text-xs text-zinc-500">
                      {item.blog.author}
                    </p>
                  </div>
                  <form action={markAsReadAction} className="ml-4 shrink-0">
                    <input type="hidden" name="id" value={String(item.id)} />
                    <button
                      type="submit"
                      data-testid={`mark-read-${item.id}`}
                      className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-500"
                    >
                      Mark as read
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </div>
        )}

        {unread.length === 0 && readingList.length > 0 && (
          <p data-testid="no-unread-blogs" className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            No unread blogs.
          </p>
        )}

        {read.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Read ({read.length})
            </h3>
            <ul className="mt-3 space-y-3">
              {read.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/blogs/${item.blog.id}`}
                      className="text-sm font-semibold text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
                    >
                      {item.blog.title}
                    </Link>
                    <p className="mt-0.5 truncate text-xs text-zinc-500">
                      {item.blog.author}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
