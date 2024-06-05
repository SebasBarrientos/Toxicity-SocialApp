import React from "react";
import { useSelector } from "react-redux";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div>Profile</div>
      <div>
        <p>Nombre de usuario: {user.name}</p>
        <p>Fecha de nacimiento: {formatDate(user.dateOfBirth)}</p>
      </div>
      <div>
        <h2>Posts</h2>
        <div>
         {console.log(user.posts)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
