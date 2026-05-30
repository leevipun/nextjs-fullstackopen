"use client";

import { Blog, Hardblogs } from "@/app/assets/data";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function NewBlog() {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const handleSubmit = () => {
    const newBlog: Blog = {
      id: Hardblogs.length + 1,
      title: title,
      author: author,
      url: url,
      likes: 0,
    };
    Hardblogs.push(newBlog);
    redirect("/blogs");
  };

  return (
    <form action={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Author</label>
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label>Url</label>
      <input
        type="text"
        placeholder="Url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
