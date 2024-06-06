import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser } from "../../features/auth/authSlice";

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
    return <div>CARGANDO</div>;
  }

  return (
    <div>
      <div>Profile</div>
      <div>
        <p>ID : {user._id}</p>
        <p>Nombre de usuario: {user.name}</p>
        <p>Fecha de nacimiento: {formatDate(user.dateOfBirth)}</p>
      </div>
      <div>
        <h2>Posts</h2>
        <div>
          {user.posts ? (
            user.posts.map((post, index) => (
              <div key={index}>
                <div>{post.caption}</div>
                <div>
                  <img
                    src={
                      "https://back-end-red-social.onrender.com/" + post.imgpost
                    }
                    alt=""
                  />
                </div>
                <div>{post.location}</div>
                <div>{post.likes}</div>
                <div>{post.commentsIds}</div>
              </div>
            ))
          ) : (
            <p>No hay posts disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
