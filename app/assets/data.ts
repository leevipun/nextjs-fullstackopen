export interface Blog {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
  user_id: number | null;
}

export interface User {
  id: number;
  username: string;
  name: string;
}
