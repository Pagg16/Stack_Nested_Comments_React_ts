import { makeRequest } from "./makeRequest";

type createCommentProps = {
  postId: string;
  message: string;
  parentId: string;
};

type updateCommentProps = Omit<createCommentProps, "parentId"> & { id: string };

type deleteCommentProps = { id: string; postId: string };

type toggleCommentLikeProps = deleteCommentProps;

export function createComment({
  postId,
  message,
  parentId,
}: createCommentProps) {
  return makeRequest(`posts/${postId}/comments`, {
    method: "POST",
    data: { message, parentId },
  });
}

export function updateComment({ postId, message, id }: updateCommentProps) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: "PUT",
    data: { message },
  });
}

export function deleteComment({ postId, id }: deleteCommentProps) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: "DELETE",
  });
}

export function toggleCommentLike({ id, postId }: toggleCommentLikeProps) {
  return makeRequest(`posts/${postId}/comments/${id}/toggleLike`, {
    method: "POST",
  });
}
