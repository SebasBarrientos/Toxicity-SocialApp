import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById } from "../../features/posts/postsSlice";
import { Spin } from "antd";

const PostDetail = () => {
  const { _id } = useParams();
  const { post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostById(_id));
  }, []);

  if(isLoading){
    return <Spin/>
  }

  return (
    <div style={{position: "sticky"}}>
        {console.log(post)}
      <h1>PostDetail</h1>
      <p>{post.caption}</p>
      <img src={`https://back-end-red-social.onrender.com/` + post.imgpost} alt="" className="max-h-[350px]" />
      
    </div>
  );
};

export default PostDetail;