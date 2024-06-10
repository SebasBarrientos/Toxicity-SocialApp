import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import commentsService from "../../features/comment/commentService";
import { getPosts, like, dislike } from "../../features/posts/postsSlice";
import { HeartTwoTone, FrownOutlined } from "@ant-design/icons";
import "./Post.scss";

const Post = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [bodyText, setbodyText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const dispatch = useDispatch();

  const onChange = (e) => {
    setbodyText(e.target.value);
  };

  const startEdit = (commentId, commentBody) => {
    setEditingCommentId(commentId);
    setEditedComment(commentBody);
  };

  const handleSaveEditedComment = async (commentId) => {
    await commentsService.modifyComment(commentId, { bodyText: editedComment });
    dispatch(getPosts());
    setEditingCommentId(null);
    setEditedComment("");
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditedComment("");
  };

  if (isLoading) {
    return <Spin />;
  }

  const handleSubmitComment = async (bodyText, postId) => {
    await commentsService.addComment({ bodyText }, postId);
    dispatch(getPosts());
  };

  return (
    <div className="container">
      {posts.map((post) => {
        return (
          <div key={post._id} className="post-card">
            <Link
              to={"/postdetail/" + post._id}
              className="no-underline hover:underline"
            >
              <h3>{post.userId?.userName}</h3>

              <div className="post-image-container">
                <img
                  src={`https://back-end-red-social.onrender.com/${post.imgpost}`}
                  alt=""
                />
              </div>

              <div className="post-caption">
                <p className="text-gray-700 text-base">{post.caption}</p>
              </div>
            </Link>

            <div className="interaction-buttons">
              <div className="like-post">
                {post.likes.length} likes
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

            <div className="comment-section">
              <input
                type="text"
                className="border"
                name="bodyText"
                value={bodyText}
                onChange={onChange}
              />
              <button
                onClick={async () => {
                  await handleSubmitComment(bodyText, post._id);
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
                    {comment._id === editingCommentId ? (
                      <>
                        <input
                          type="text"
                          value={editedComment}
                          onChange={(e) => setEditedComment(e.target.value)}
                        />
                        <div className="edit-buttons">
                          <button
                            onClick={() => handleSaveEditedComment(comment._id)}
                            className="save-button"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="cancel-button"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p>{comment.bodyText}</p>
                        <button
                          onClick={() =>
                            startEdit(comment._id, comment.bodyText)
                          }
                          className="edit-button"
                        >
                          Edit
                        </button>
                      </>
                    )}
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
