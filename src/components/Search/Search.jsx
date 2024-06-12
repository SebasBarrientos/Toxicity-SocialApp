import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import { getPostByName } from "../../features/posts/postsSlice";

const Search = () => {

  const { caption } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log(caption);
    dispatch(getPostByName(caption))
    console.log(caption);
  }, [caption]);

  return <div>
    <Post/>
  </div>;
};

export default Search;
