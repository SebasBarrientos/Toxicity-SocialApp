import { Spin } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import commentsService from "../../features/comment/commentService";
import { getPosts, like } from "../../features/posts/postsSlice";
import { HeartTwoTone } from "@ant-design/icons";

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
    <div className="container mx-auto p-4">
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-lg overflow-hidden mb-4"
          >
            <Link
              to={"/postdetail/" + post._id}
              className="no-underline hover:underline"
            >
              <h3>{post.userId?.userName}</h3>

              <div className="h-[350px] flex justify-center items-center bg-gray-100 shadow-lg">
                <img
                  src={
                    `https://back-end-red-social.onrender.com/` + post.imgpost
                  }
                  alt=""
                  className="max-h-[350px]"
                />
              </div>

              <div className="p-4">
                <p className="text-gray-700 text-base">{post.caption}</p>
              </div>
            </Link>

            <div className="like-post">{post.likes.length} likes</div>

            <div>
              <HeartTwoTone twoToneColor="#eb2f96" onClick={() => {
                dispatch(like(post._id))
              }} />
            </div>
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

            <div>
              {post.commentsIds.map((comment) => {
                return (
                  <div key={comment._id}>
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
