import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import { getPostByName } from "../../features/posts/postsSlice";
import SearchedUsers from "../searchByUserName/searchByUserName";
import { searchByUserName } from "../../features/auth/authSlice";

const Search = () => {

  const { caption } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPostByName(caption))
    dispatch(searchByUserName(caption))
  }, [caption]);

  return <div>
    <h2>Posts</h2>
    <Post/>
    <h2>Users</h2>
    <SearchedUsers/>
  </div>;
};

export default Search;
