import { getPosts } from "../../api/posts";
import { Link } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import styles from "./postList.module.css";

export default function PostList() {
  const { loading, error, value: posts } = useAsync(getPosts);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div className={styles.postContainer}>
      {posts?.map((post) => (
        <Link className={styles.post} key={post.id} to={`/posts/${post.id}`}>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.body}>{post.body}</div>
        </Link>
      ))}
    </div>
  );
}
