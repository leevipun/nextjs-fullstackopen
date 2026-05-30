export interface Blog {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "Understanding JavaScript Closures",
    author: "John Doe",
    url: "https://example.com/understanding-javascript-closures",
    likes: 10,
  },
  {
    id: 2,
    title: "A Guide to React Hooks",
    author: "Jane Smith",
    url: "https://example.com/a-guide-to-react-hooks",
    likes: 15,
  },
  {
    id: 3,
    title: "TypeScript for Beginners",
    author: "Alice Johnson",
    url: "https://example.com/typescript-for-beginners",
    likes: 20,
  },
];
