import { Spin } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import commentsService from "../../features/comment/commentService";
import { getPosts, like } from "../../features/posts/postsSlice";
import { HeartTwoTone } from "@ant-design/icons";
import "./Post.scss"

const Post = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [bodyText, setbodyText] = useState({ bodyText: "" });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setbodyText({ bodyText: e.target.value });
  };
  if (isLoading) {
    return <Spin />;
  }

  const handleSubmitComment = (bodyText, postCommented) => {
    return commentsService.addComment(bodyText, postCommented);
  };

  return (
    <div className="container">
      {posts.map((post) => {
        return (
          <div key={post._id} className="post-card">
            <Link to={"/postdetail/" + post._id} className="no-underline hover:underline">
              <h3>{post.userId?.userName}</h3>

              <div className="post-image-container">
                <img src={`https://back-end-red-social.onrender.com/` + post.imgpost} alt="" />
              </div>

              <div className="post-caption">
                <p className="text-gray-700 text-base">{post.caption}</p>
              </div>
            </Link>

            <div className="like-post">
              {post.likes.length} likes
              <HeartTwoTone twoToneColor="#eb2f96" onClick={() => {
                dispatch(like(post._id))
              }} />
            </div>

            <div className="comment-section">
              <input
                type="text"
                className="border"
                name="bodyText"
                onChange={onChange}
              />
              <button
                onClick={async () => {
                  await handleSubmitComment(bodyText, post._id);
                  dispatch(getPosts());
                }}
              >
                Submit comment
              </button>
            </div>

            <div className="comments-list">
              {post.commentsIds.map((comment) => {
                return (
                  <div key={comment._id} className="comment">
                    <p>{comment.userId?.name}</p>
                    <p>{comment.bodyText}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
