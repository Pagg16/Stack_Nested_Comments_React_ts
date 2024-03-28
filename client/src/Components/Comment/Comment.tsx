import { IconBtn } from "../IconBtn/IconBtn";
import { Comment as CommentType } from "../../api/posts";
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa";
import styles from "./comment.module.css";
import { usePost } from "../../context/PostContext/usePost";
import CommentList from "../../CommentList/CommentList";
import { useState } from "react";
import CommentForm from "../CommentForm/CommentForm";
import { useAsyncFn } from "../../hooks/useAsync";
import {
  createComment,
  deleteComment,
  toggleCommentLike,
  updateComment,
} from "../../api/comments";
import { useUser } from "../../hooks/useUser";

const formattedDate = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function Comment({
  id,
  message,
  user,
  createdAt,
  likeCount,
  likedByMe,
}: CommentType) {
  const [areChildrenHidden, setAreChildrenHidden] = useState<boolean>(false);
  const [isReplyng, setisReplyng] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id: userId } = useUser();

  // console.log(userId);

  const {
    loading: createCommentLoading,
    error: createCommentError,
    execute: createCommentFn,
  } = useAsyncFn(createComment);

  const postContext = usePost();
  const post = postContext?.post;
  const createLocalComment = postContext?.createLocalComment;
  const updateLocalComment = postContext?.updateLocalComment;
  const deleteLocalComment = postContext?.deleteLocalComment;
  const toggleLocalCommentLike = postContext?.toggleLocalCommentLike;
  const childComments = postContext?.getReplies(id);

  const {
    loading: updateCommentLoading,
    error: updateCommentError,
    execute: updateCommentFn,
  } = useAsyncFn(updateComment);

  const {
    loading: deleteCommentLoading,
    error: deleteCommentError,
    execute: deleteCommentFn,
  } = useAsyncFn(deleteComment);

  const {
    loading: toggleCommentLikeLoading,
    error: toggleCommentLikeError,
    execute: toggleCommentLikeFn,
  } = useAsyncFn(toggleCommentLike);

  function onCommentReply(message: string) {
    return (
      createCommentFn &&
      createCommentFn({ postId: post?.id, message, parentId: id }).then(
        (comment: CommentType) => {
          setisReplyng(false);
          createLocalComment && createLocalComment(comment);
        }
      )
    );
  }

  function onCommentUpdate(message: string) {
    return (
      updateCommentFn &&
      updateCommentFn({ postId: post?.id, message, id }).then(
        (comment: CommentType) => {
          setIsEditing(false);
          updateLocalComment && updateLocalComment(id, comment.message);
        }
      )
    );
  }

  function onDeleteComment() {
    return (
      deleteCommentFn &&
      deleteCommentFn({ postId: post?.id, id }).then(
        ({ id }) => deleteLocalComment && deleteLocalComment(id)
      )
    );
  }

  function onToggleCommentLike() {
    return (
      toggleCommentLikeFn &&
      toggleCommentLikeFn({ id, postId: post?.id }).then(
        ({ addLike }) =>
          toggleLocalCommentLike && toggleLocalCommentLike(id, addLike)
      )
    );
  }

  return (
    <>
      <div className="comment">
        <div className="header">
          <span>{user.name}</span>
          <span>{formattedDate.format(Date.parse(createdAt))}</span>
        </div>
        {isEditing ? (
          <CommentForm
            onBlur={() => setIsEditing(false)}
            autoFocus
            initialValue={message}
            onSubmit={onCommentUpdate}
            loading={updateCommentLoading}
            error={updateCommentError}
          />
        ) : (
          <div className="message">{message}</div>
        )}
        <div className="footer">
          <IconBtn
            disabled={toggleCommentLikeLoading}
            onClick={onToggleCommentLike}
            Icon={likedByMe ? FaHeart : FaRegHeart}
            arial-lable={likedByMe ? "Unlike" : "like"}
          >
            {likeCount}
          </IconBtn>
          {userId === user.id && (
            <>
              <IconBtn
                onClick={() => setIsEditing((prevState) => !prevState)}
                isActive={isEditing}
                Icon={FaEdit}
                arial-lable={isEditing ? "Cansel Edit" : "Edit"}
              />
              <IconBtn
                disabled={deleteCommentLoading}
                onClick={onDeleteComment}
                Icon={FaTrash}
                arial-lable="Delete"
                color="danger"
              />
            </>
          )}
          <IconBtn
            onClick={() => setisReplyng((prevState) => !prevState)}
            isActive={isReplyng}
            Icon={FaReply}
            arial-lable={isReplyng ? "Cansel Reply" : "Reply"}
          />
        </div>
        {deleteCommentError && (
          <div className="error-msg mt-1">{deleteCommentError}</div>
        )}
        {toggleCommentLikeError && (
          <div className="error-msg mt-1">{toggleCommentLikeError}</div>
        )}
      </div>
      {isReplyng && (
        <div className="mt-1 ml-3">
          <CommentForm
            onBlur={() => setisReplyng(false)}
            autoFocus={true}
            onSubmit={onCommentReply}
            loading={createCommentLoading}
            error={createCommentError}
          />
        </div>
      )}
      {childComments && childComments.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? "hide" : ""
            }`}
          >
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentList comments={childComments} />
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
  );
}
