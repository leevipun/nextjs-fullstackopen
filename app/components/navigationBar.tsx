import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
      <ul className="mx-auto flex max-w-5xl list-none items-center gap-4 px-6 py-4 text-sm font-medium">
        <li>
          <Link
            href="/"
            className="rounded-full px-3 py-1 text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Home
          </Link>
        </li>
        <li>
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
    </nav>
  );
}
