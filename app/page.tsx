import HomepageContent from "./homepage.mdx";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="markdown">
        <HomepageContent />
      </div>
    </div>
  );
}
