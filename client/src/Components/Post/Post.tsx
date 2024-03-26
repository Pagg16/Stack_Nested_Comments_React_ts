import CommentList from "../../CommentList/CommentList";
import createComment from "../../api/comments";
import { Comment } from "../../api/posts";
import { usePost } from "../../context/PostContext/usePost";
import { useAsyncFn } from "../../hooks/useAsync";
import CommentForm from "../CommentForm/CommentForm";

export default function Post() {
  const postContext = usePost();
  const {
    loading,
    error,
    execute: createCommentFn,
  } = useAsyncFn(createComment);

  const post = postContext?.post;
  const rootComments = postContext?.rootComments;
  const createLocalComment = postContext?.createLocalComment;

  function onCommentCreate(message: string) {
    return (
      createCommentFn &&
      createCommentFn({ postId: post?.id, message }).then(
        (comment: Comment) => createLocalComment && createLocalComment(comment)
      )
    );
  }

  return (
    post && (
      <div>
        <h2>{post.title}</h2>
        <article>{post.body}</article>
        <h3>Commetns</h3>
        <section>
          <CommentForm
            loading={loading}
            error={error}
            autoFocus
            onSubmit={onCommentCreate}
          />
          {rootComments && <CommentList comments={rootComments} />}
        </section>
      </div>
    )
  );
}
