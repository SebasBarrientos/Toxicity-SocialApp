import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { HeartTwoTone, FrownOutlined } from "@ant-design/icons";
import { div } from "three/examples/jsm/nodes/Nodes.js";
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
const SearchedUsers = () => {
  const { searchByUserName, searchIsLoading } = useSelector((state) => state.auth);
  console.log(searchByUserName);

  console.log(searchIsLoading);
  if (searchIsLoading) {
    return <Spin />;
  }

  return (


    <div>
      {searchByUserName.map((user) => {
        return (
          <div>
            <div className="profile">
              <div className="profile-header">
                <h1>
                  <Link to={"/userSelected/" + user._id}>
                    {user.userName}
                  </Link>
                </h1>
              </div>
              <img src={"http://localhost:3000/" + user.profilePic} alt="" />

            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SearchedUsers