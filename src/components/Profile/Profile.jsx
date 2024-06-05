import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div>
        <div>Profile</div>
        <div>
          <p>{user.name}</p>
          <p>{user.dateOfBirth}</p>
        </div>
        {/* <div>{console.log(user.posts)}</div>no vincula post con user */}
      </div>
    </>
  );
};

export default Profile;
