import { makeRequest } from "./makeRequest";

type PostList = {
  id: string;
  title: string;
}[];

export type Post = {
  id: string;
  body: string;
  comments: Comment[];
  title: string;
};

type UserComments = {
  id: string;
  name: string;
};

export type Comment = {
  createdAt: string;
  id: string;
  message: string;
  parentId: string | null;
  user: UserComments;
};

export function getPosts(): Promise<PostList> {
  return makeRequest("/posts");
}

export function getPost(id: string): Promise<Post> {
  return makeRequest(`/posts/${id}`);
}
