import PostList from "../PostLists.js/PostList";
import { Route, Routes } from "react-router-dom";
import styles from "./app.module.css";
import Post from "../Post/Post";
import { PostProvider } from "../../context/PostContext";

function App() {
  return (
    <div className={styles.appContainer}>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route
          path="/posts/:id"
          element={
            <PostProvider>
              <Post />
            </PostProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
