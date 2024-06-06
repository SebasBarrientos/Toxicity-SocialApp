import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Post = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="container mx-auto p-4">
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-lg overflow-hidden mb-4"
          >
            {console.log(post)}
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
              <div>
                {post.commentsIds.map((comment) => {
                  return (
                    <div>
                      <p>{comment.userId.name}</p>
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
