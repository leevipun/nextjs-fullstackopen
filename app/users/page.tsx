import { getUsers } from "../services/users";
import { User } from "../assets/data";
import Link from "next/link";

export default async function UsersPage() {
  const users: User[] = await getUsers();
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Community members and their published blogs
          </p>
        </div>
        <p className="text-sm text-zinc-500">Sorted by blogs</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/users/${user.username}`}
            className="group block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {user.name}
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 group-hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:group-hover:bg-zinc-700">
              Active contributor
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
