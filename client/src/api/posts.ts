import { makeRequest } from "./makeRequest";

export type Post = {
  id: string;
  title: string;
};

export type GetPosts = () => Promise<Post[]>;

export function getPosts(): Promise<Post[]> {
  return makeRequest("/posts");
}

export function getPost(id: string): Promise<Post> {
  return makeRequest(`/posts/${id}`);
}
