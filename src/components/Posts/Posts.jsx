import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import { useDispatch } from "react-redux";
import { getPosts } from "../../features/posts/postsSlice";
import Home from "../Home/Home";

const Posts = () => {
  const dispatch = useDispatch();
  // que arranque en 1
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPosts(page));
  }, [page]);

  return (
    <div>
      <button onClick={() => setPage((page) => page + 1)}>Next</button>
      <h1>Posts</h1>
      <Home />
      <button onClick={() => setPage((page) => page + 1)}>Next</button>
      <button onClick={() => setPage((page) => page - 1)}>back</button>
    </div>
  );
};

export default Posts;