import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../features/auth/authSlice";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  useEffect(() => {
    if (user) {
      dispatch(getUserById(user._id));
    }
  }, [user]);

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
              <div key={index}>{post.content}</div>
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
