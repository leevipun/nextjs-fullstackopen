import { Blog, Hardblogs } from "../assets/data";

export function getBlogById(id: number) {
  const blog = Hardblogs.find((blog) => blog.id == id);
  return blog;
}

export function addNewBlog(blog: Blog) {
  Hardblogs.push(blog);
}

export function likeBlog(id: number) {
  const blog = Hardblogs.find((blog) => blog.id === id);
  if (!blog) {
    return false;
  }
  blog.likes = (blog.likes ?? 0) + 1;
  return blog;
}
