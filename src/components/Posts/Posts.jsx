import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import { useDispatch } from "react-redux";
import { getPosts } from "../../features/posts/postsSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPosts(page));
  }, [page]);

  return (
    <div>
      <button onClick={() => setPage(page + 1)}>Next</button>
      <h1>Posts</h1>
      <Post />
      <button onClick={() => setPage(page + 1)}>Next</button>
      <button onClick={() => setPage(page - 1)}>back</button>
    </div>
  );
};

export default Posts;