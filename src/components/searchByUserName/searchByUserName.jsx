import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import "./SearchByUserName.scss"


const SearchByUserName = () => {
  const { searchByUserName, searchIsLoading } = useSelector((state) => state.auth);

  if (searchIsLoading) {
    return <Spin className="loading" />;
  }

  return (
    <div className="searched-users-container">
      {searchByUserName.map((user) => {
        return (
          <div key={user._id} className="profile">
            <div className="profile-header">
              <h1>
                <Link to={"/userSelected/" + user._id}>
                  {user.userName}
                </Link>
              </h1>
            </div>
            <div className="post-userSearched-image-container">

            <img src={"http://localhost:3000/" + user.profilePic} alt={user.userName} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SearchByUserName;
