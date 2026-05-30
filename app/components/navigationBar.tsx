import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav>
      <ul className="m-0 flex list-none gap-4 p-0">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/blogs">Blogs</Link>
        </li>
        <li>
          <Link href="/blogs/new">New</Link>
        </li>
      </ul>
    </nav>
  );
}
