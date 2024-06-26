import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { dislike, getPostById, getPosts, like } from "../../features/posts/postsSlice";
import { Spin } from "antd";
import { HeartTwoTone, FrownOutlined } from "@ant-design/icons";
import commentsService from "../../features/comment/commentService";
import "./PostDetail.scss"
const PostDetail = () => {
  const { _id } = useParams();
  const { post, isLoadingPost } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [bodyText, setBodyText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  useEffect(() => {
    dispatch(getPostById(_id));
  }, []);
  if (isLoadingPost) {
    return <Spin />
  }
  const onChange = (e) => {
    setBodyText(e.target.value);
  };
  const startEdit = (commentId, commentBody) => {
    setEditingCommentId(commentId);
    setEditedComment(commentBody);
  };

  const handleSaveEditedComment = async (commentId) => {
    await commentsService.modifyComment(commentId, { bodyText: editedComment });
    dispatch(getPostById(_id));
    setEditingCommentId(null);
    setEditedComment("");
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditedComment("");
  };

  const handleSubmitComment = async (postId) => {
    await commentsService.addComment({ bodyText }, postId);
    dispatch(getPostById(_id));
    setBodyText("");
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentsService.deleteComment(commentId);
      dispatch(getPostById(_id));
    } catch (error) {
      console.error("There's been a problem when deleting the comment comentario:", error);
    }
  };
  return (
    <div>
      <div className="post-card">
        <Link to={"/userSelected/" + post.userId?._id}>
          <h3>{post.userId?.userName}</h3>
        </Link>
        <div className="post-caption">
          <h4 className="">{post.caption}</h4>
        </div>
        <div className="post-image-container">
          <img
            src={`https://back-end-red-social.onrender.com/${post.imgpost}`}
            alt=""
          />
        </div>
        
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
        <div className="bg-like-comment">
          <div className="flex-location">

        <h4 className="">Location: {post.location}</h4>
          </div>

          <div className="comment-section">
            <input
              type="text"
              className="border"
              name="bodyText"
              value={bodyText}
              onChange={onChange}
              placeholder="Add comment"
            />
            <button onClick={() => handleSubmitComment(post._id)}>
              Submit comment
            </button>
          </div>
        </div>

        <div className="comments-list">
          {post.commentsIds.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-user-div">
                <p>{comment.userId?.name}</p>
              </div>
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
                  <p>Commented: {comment.bodyText}</p>
                  <button
                    onClick={() => startEdit(comment._id, comment.bodyText)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button-comment"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PostDetail;