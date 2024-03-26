import Comment from "../Components/Comment/Comment";
import { CommentsGroup } from "../context/PostContext/PostContext";

export default function CommentList({ comments }: CommentsGroup) {
  return comments.map((comment) => (
    <div key={comment.id}>
      <Comment {...comment} />
    </div>
  ));
}
