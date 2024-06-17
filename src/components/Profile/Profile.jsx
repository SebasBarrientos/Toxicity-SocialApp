import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser } from "../../features/auth/authSlice";
import "./Profile.scss";
import { getPosts } from "../../features/posts/postsSlice";
import postsService from "../../features/posts/postsService";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isLoading, token } = useSelector((state) => state.auth);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPost, setEditedPost] = useState("");
  const dispatch = useDispatch();

  const postEdit = (postId, postBody) => {
    setEditingPostId(postId);
    setEditedPost(postBody);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditedPost("");
  };

  const handleUpdatePost = async (postId) => {
    try {
      await postsService.updatePost(postId, { caption: editedPost });
      dispatch(getPosts());
      setEditingPostId(null);
      setEditedPost("");
      dispatch(getLoggedUser());
    } catch (error) {
      console.error("Failed to update the post", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await postsService.deletePost(postId);
      dispatch(getLoggedUser());
    } catch (error) {
      console.error("Failed to delete the post", error);
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(getLoggedUser());
    }
  }, [token, dispatch]);

  if (isLoading) {
    return <div className="loading">CARGANDO</div>;
  }

  return (
    <div className="profile-p">
      <div className="profile-header">
        <h1>{user.userName}</h1>
      </div>
        <div className="image">

          <img src={"https://back-end-red-social.onrender.com/" + user.profilePic} alt="" />
        </div>
      <div className="profile-details">
        <div className="followers-div">
          <p>Followers: </p>
          {user.followers.length == 0 ? <p>0</p> : user.followers.map((follower) => (
            <p key={follower._id}className="follower-div">{follower.userName}</p>
          ))}

        </div>
      </div>
      <div className="profile-posts">
        <div className="post-container">
          {user.posts ? (
            user.posts.map((post, index) => (
              <div key={index} className="post">
                <div className="post-caption">
                  {editingPostId === post._id ? (
                    <>
                      <input
                        type="text"
                        value={editedPost}
                        onChange={(e) => setEditedPost(e.target.value)}
                      />
                      <button
                        onClick={() => handleUpdatePost(post._id)}
                        className="save-button"
                      >
                        Save
                      </button>
                      <button onClick={cancelEdit} className="cancel-button">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{post.caption}</p>
                      <button
                        onClick={() => postEdit(post._id, post.caption)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
                <div className="post-image">
                  <div className="image">
                    <Link to={"/postDetail/" + post._id}>
                      <img
                        src={`https://back-end-red-social.onrender.com/${post.imgpost}`}
                        alt=""
                      />
                    </Link>

                  </div>
                  <div className="post-location">{post.location}</div>
                  <div className="post-likes">Likes: {post.likes.length}</div>
                  <div className="post-comments">
                    Comments: {post.commentsIds.length}
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    Delete post
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-posts">No hay posts disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
