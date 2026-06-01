export interface Blog {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: string | null;
  userId: number | null;
}

export interface User {
  id: number;
  username: string;
  name: string;
}
