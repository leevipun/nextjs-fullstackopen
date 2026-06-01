import BlogPost from "@/app/components/singleBlog";
import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <>
      <BlogPost {...blog} />
    </>
  );
}
