import { usePost } from "../../context/PostContext";

export default function Post() {
  const post = usePost();
  console.log(post);
  return <div>Post</div>;
}
