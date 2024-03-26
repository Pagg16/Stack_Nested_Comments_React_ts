import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { useAsync } from "../../hooks/useAsync";
import { Comment, Post, getPost } from "../../api/posts";
import { useParams } from "react-router-dom";

type PostContext = {
  post: Post;
  getReplies: (parentId: string) => Comment[];
  rootComments: Comment[];
  createLocalComment: (commetn: Comment) => void;
};

export const PostContext = createContext<PostContext | null>(null);

export type CommentsGroup = {
  [parentId: string]: Comment[];
};

export function PostProvider({ children }: { children: ReactNode }) {
  const { id } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const {
    loading,
    error,
    value: post,
  } = useAsync<Omit<Post, "id">>(() => {
    if (id) {
      return getPost(id);
    } else {
      return Promise.resolve({} as Post);
    }
  }, [id]);

  const commentsByParentId = useMemo((): CommentsGroup => {
    const group: CommentsGroup = {};
    comments.forEach((comment) => {
      const parentId = comment.parentId ?? "parentComment";
      group[parentId] ||= [];
      group[parentId].push(comment);
    });

    return group;
  }, [comments]);

  useEffect(() => {
    if (post && post.comments && post.comments.length > 0) {
      setComments(post.comments);
    }
  }, [post?.comments]);

  function getReplies(parentId: string) {
    return commentsByParentId && commentsByParentId[parentId];
  }

  function createLocalComment(comment: Comment) {
    setComments((prevState) => [comment, ...prevState]);
  }

  if (!id) return null;

  return (
    <div>
      {loading && <div>Loading</div>}
      {error && <div>Error</div>}
      {post !== null && post && Object.keys(post).length !== 0 && (
        <PostContext.Provider
          value={{
            post: { id, ...post },
            getReplies,
            rootComments: commentsByParentId["parentComment"],
            createLocalComment,
          }}
        >
          {children}
        </PostContext.Provider>
      )}
    </div>
  );
}
