import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser } from "../../features/auth/authSlice";
import './Profile.scss';

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Profile = () => {
  const { user, isLoading, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getLoggedUser());
    }
  }, [token]);

  if (isLoading) {
    return <div className="loading">CARGANDO</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      <div className="profile-details">
        <p>ID: {user._id}</p>
        <p>Nombre de usuario: {user.userName}</p>
        <p>Fecha de nacimiento: {formatDate(user.dateOfBirth)}</p>
      </div>
      <div className="profile-posts">
        <h2>Posts</h2>
        <div>
          {user.posts ? (
            user.posts.map((post, index) => (
              <div key={index} className="post">
                <div className="post-caption">{post.caption}</div>
                <div className="post-image">
                  <img
                    src={"http://localhost:3000/" + post.imgpost}
                    alt=""
                  />
                </div>
                <div className="post-location">{post.location}</div>
                <div className="post-likes">Likes: {post.likes}</div>
                <div className="post-comments">Comments: {post.commentsIds}</div>
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
