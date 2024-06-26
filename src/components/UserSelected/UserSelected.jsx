import React, { useEffect, useState } from "react";
import authService from "../../features/auth/authService";
import { Link, useParams } from "react-router-dom";
import "./UserSelected.scss";
import { useSelector } from "react-redux";


const UserSelected = () => {
  const { _id } = useParams();
  const [user, setUser] = useState("")
  const { user: myUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      const searchedUser = await authService.getSelectedUser(_id);
      setUser(searchedUser.user);
    };
    fetchUser();

  }, [])
  const follow = async (_id) => {
    const res = await authService.followUser(_id)
    console.log(user);
    const { followers, posts } = user
    followers.push(myUserId)
    const newUser = { ...res.user, followers, posts }
    console.log(newUser);
    setUser(newUser)
  }
  const unfollow = async (_id) => {
    const res = await authService.unfollowUser(_id)
    const { followers, posts } = user
    const actualFollowers = followers.filter(follower => follower._id !== myUserId._id)
    const newUser = { ...res.user, followers: actualFollowers, posts }
    setUser(newUser)

  }

  if (!user) {
    return <div className="loading">CARGANDO</div>;
  }



  return (
    <div className="profile">
      <div className="button-follow">

      <div className="button-follow">

        {user.followers.some((follower) => follower._id == myUserId._id) == false ? <button onClick={() => follow(_id)}>Follow</button> : <button onClick={() => unfollow(_id)}>Unfollow</button>}
      </div>
      </div>
      <div className="profile-header">
        <h1>{user.userName}</h1>
        <img src={"https://back-end-red-social.onrender.com/" + user.profilePic} alt="" />

      </div>


      <div className="profile-details">
        <div className="followers-div">
        <p>Followers: </p>
        {user.followers.length==0 ? <p> No followers yet!</p>: user.followers.map((follower) => (
          <p key={follower._id}className="follower-div"> {follower.userName} </p>
        ))}
        
        </div>

      </div>
      <div className="profile-posts">
        <h2>Posts</h2>
        <div className="post-container">
          {user.posts ? (
            user.posts.map((post) => (

              <div key={post._id} className="post">
                <div className="post-image">
                  <Link to={"/postDetail/" + post._id}>
                    <img
                      src={`https://back-end-red-social.onrender.com/${post.imgpost}`}
                      alt=""
                    />
                  </Link>
                  <div className="post-location">{post.location}</div>
                  <div className="post-likes">Likes: {post.likes.length}</div>
                  <div className="post-comments">Comments: {post.commentsIds.length}</div>
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

export default UserSelected;
