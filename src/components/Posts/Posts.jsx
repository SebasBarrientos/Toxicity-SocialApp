import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../features/posts/postsSlice";


const Posts = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPosts(page));
  }, [page]);

  return (
    <div className="posts-container">
      <div className="post-list">
        <Post />
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="pagination-button">Back</button>
        <button onClick={() => setPage(page + 1)} className="pagination-button">Next</button>
      </div>
    </div>
  );
};

export default Posts;
