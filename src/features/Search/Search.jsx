import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import { getPostByName } from "../posts/postsSlice";
import { searchByUserName } from "../auth/authSlice";
import "./Search.scss"
import SearchByUserName from "../../components/searchByUserName/SearchByUserName";
const Search = () => {

  const { caption } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostByName(caption))
    dispatch(searchByUserName(caption))
  }, [caption]);

  return <div >
    <div className="title-search">
      <h2>Posts found</h2>
    </div>
    <Post />
    <div className="title-search">
      <h2>Users found</h2>
    </div>
    <SearchByUserName/>
  </div>;
};

export default Search;
