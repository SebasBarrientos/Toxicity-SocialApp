import React, { useEffect } from "react";
import Post from "../Post/Post";
import { useDispatch } from "react-redux";
import { getPosts } from "../../features/posts/postsSlice";

const Posts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <Post />
    </div>
  );
};

export default Posts;