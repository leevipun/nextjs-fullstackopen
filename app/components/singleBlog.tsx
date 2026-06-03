import { Blog } from "../assets/data";
import { addToReadingListAction, likeBlogAction } from "../actions/blogs";

type Props = Blog & {
  isOwner: boolean;
  isInReadingList: boolean;
};

export default function BlogPost({
  isOwner,
  isInReadingList,
  ...blog
}: Props) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {blog.title}
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          By {blog.author}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          {blog.likes} likes
        </div>
      </div>
      <form action={likeBlogAction} className="mt-4">
        <input type="hidden" name="id" value={String(blog.id)} />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Like
        </button>
      </form>
      {!isOwner && !isInReadingList && (
        <form action={addToReadingListAction} className="mt-4">
          <input type="hidden" name="blogId" value={String(blog.id)} />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
          >
            Add to reading list
          </button>
        </form>
      )}
      {isInReadingList && !isOwner && (
        <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
          In your reading list
        </p>
      )}
    </div>
  );
}
