import { createContext, useContext } from "react";
import { useAsync } from "../hooks/useAsync";
import { Post, getPost } from "../api/posts";
import { useParams } from "react-router-dom";

const Context = createContext({});

export function usePost() {
  return useContext(Context);
}

export function PostProvider({ children }) {
  const { id } = useParams();

  const {
    loading,
    error,
    value: post,
  } = useAsync<Post>(() => {
    if (id) {
      return getPost(id);
    } else {
      return Promise.resolve({} as Post);
    }
  }, [id]);

  return (
    <Context.Provider value={{ id, ...post }}>
      {loading ? <div>Loading</div> : error ? <div>Error</div> : children}
    </Context.Provider>
  );
}
