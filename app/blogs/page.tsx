"use client";

import { useState } from "react";
import { Blog, Hardblogs } from "../assets/data";

export default function Blogs() {
  const [blogs] = useState<Blog[]>(Hardblogs);

  return (
    <div>
      <h1>Blogs</h1>
      {blogs?.map((blog) => (
        <div key={blog.id} className="border p-2 rounded-lg m-4">
          <h1>{blog.title}</h1>
          <h2>Author: {blog.author}</h2>
          <p>Likes: {blog.likes}</p>
        </div>
      ))}
    </div>
  );
}
