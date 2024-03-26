import { useContext } from "react";
import { PostContext } from "./PostContext";

export function usePost() {
  return useContext(PostContext);
}
