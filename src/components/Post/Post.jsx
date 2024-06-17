import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { HeartTwoTone, FrownOutlined } from "@ant-design/icons";
import { getPosts, like, dislike } from "../../features/posts/postsSlice";
import commentsService from "../../features/comment/commentService";
import "./Post.scss";

const Post = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="container">

      {posts.map((post) => (

        <div key={post._id} className="post-card">
          <Link to={"/userSelected/" + post.userId?._id}
            className="no-underline hover:underline">
            <h3>{post.userId?.userName}</h3>
          </Link>
          <div className="post-caption">
            <h4>{post.caption}</h4>
          </div>

          <Link
            to={"/postdetail/" + post._id}
            className="no-underline hover:underline"
          >
            <div className="post-image-container">
              <img
                src={`https://back-end-red-social.onrender.com/${post.imgpost}`}
                alt=""
              />
            </div>
          </Link>


            <div className="interaction-buttons">
              <div className="like-post">
                {post.likes.length}
                <HeartTwoTone
                  twoToneColor="#eb2f96"
                  onClick={() => {
                    dispatch(like(post._id));
                  }}
                />
              </div>

              <div className="dislike-post">
                <FrownOutlined
                  onClick={() => {
                    dispatch(dislike(post._id));
                  }}
                />
              </div>
            </div>
          <div className="bg-like-comments">
            <div className="flex-comments">

              <p>
                Comments ({post.commentsIds.length})
              </p>
            </div>
            <div className="comments-list">
            </div>


          </div>

        </div>
      ))}
    </div>
  );
};

export default Post;

