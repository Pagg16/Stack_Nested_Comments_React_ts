import { IconBtn } from "../IconBtn/IconBtn";
import { Comment as CommentType } from "../../api/posts";
import { FaEdit, FaHeart, FaReply, FaTrash } from "react-icons/fa";
import styles from "./comment.module.css";
import { usePost } from "../../context/PostContext/usePost";
import CommentList from "../../CommentList/CommentList";
import { useState } from "react";

const formattedDate = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function Comment({ id, message, user, createdAt }: CommentType) {
  const [areChildrenHidden, setAreChildrenHidden] = useState<boolean>(false);
  const postContext = usePost();
  const childComments = postContext?.getReplies(id);

  return (
    <>
      <div className="comment">
        <div className="header">
          <span>{user.name}</span>
          <span>{formattedDate.format(Date.parse(createdAt))}</span>
        </div>
        <div className="message">{message}</div>
        <div className="footer">
          <IconBtn Icon={FaHeart} arial-lable="like">
            2
          </IconBtn>
          <IconBtn Icon={FaReply} arial-lable="Reply" />
          <IconBtn Icon={FaEdit} arial-lable="Edit" />
          <IconBtn Icon={FaTrash} arial-lable="Delete" color="danger" />
        </div>
      </div>
      {childComments && childComments.length > 0 && (
        <div className="nested-comments-stack">
          <button
            className="collapse-line"
            aria-label="Hide Replies"
            onClick={() => setAreChildrenHidden(false)}
          />
          <div className="nested-comments">
            <CommentList comments={childComments} />
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </div>
      )}
    </>
  );
}
