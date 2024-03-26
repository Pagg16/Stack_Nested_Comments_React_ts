import { makeRequest } from "./makeRequest";

type createCommentProps = {
  postId: string;
  message: string;
  parentId: string;
};

export default function createComment({
  postId,
  message,
  parentId,
}: createCommentProps) {
  return makeRequest(`posts/${postId}/comments`, {
    method: "POST",
    data: { message, parentId },
  });
}
