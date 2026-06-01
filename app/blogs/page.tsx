import Link from "next/link";
import { getBlogs } from "../services/blogs";

type BlogSearchParams = {
  filter?: string | string[];
};

export default async function Blogs({
  searchParams,
}: {
  searchParams?: Promise<BlogSearchParams>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const filter =
    typeof resolvedSearchParams?.filter === "string"
      ? resolvedSearchParams.filter
      : "";
  const blogs = await getBlogs(filter);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Blogs</h1>
        <form action="/blogs" method="get">
          <input
            defaultValue={filter}
            name="filter"
            type="text"
            placeholder="Search"
            className="border rounded-lg p-2 m-2"
          />
          <button type="submit">Search</button>
        </form>
        <p className="text-sm text-zinc-500">Sorted by likes</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => (
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
        ))}
      </div>
    </div>
  );
}
