import BlogPost from "@/app/components/singleBlog";
import { getBlogById, isInReadingList } from "@/app/services/blogs";
import { auth } from "@/auth";
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

  const session = await auth();
  const userId = session?.user?.id ? Number(session.user.id) : null;
  const isOwner = userId !== null && userId === blog.userId;
  const readingListStatus =
    userId !== null && !isOwner
      ? await isInReadingList(userId, blog.id)
      : false;

  return (
    <>
      <BlogPost
        {...blog}
        isOwner={isOwner}
        isInReadingList={readingListStatus}
      />
    </>
  );
}
