import React, { useEffect, useState } from "react";
import authService from "../../features/auth/authService";
import { useParams } from "react-router-dom";



const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const UserSelected = () => {
  const { _id } = useParams();
  const [user, setUser] = useState("")
  useEffect( () => {
    const fetchUser = async () => {
      const searchedUser = await authService.getSelectedUser(_id);
      console.log("User data received:", searchedUser)
      setUser(searchedUser );
    };

    fetchUser();
  }, [])
 const follow = (_id)=>{
  authService.followUser(_id)
 }
  if (!user) {
    return <div className="loading">CARGANDO</div>;
  }

  return (
    <div className="profile">
      {console.log(user)}
      <div className="profile-header">
        <h1>Profile</h1> 
      </div>
        <button onClick={()=> follow(_id)}>Follow</button>
      <div className="profile-details">
        <p>Followers: {user.user.followers.length = 0 ?  "0" : user.user.followers.map((follower) => (
          follower.name
        ))}</p>
        <p>Nombre de usuario: {user.user.userName}</p>
        <p>Fecha de nacimiento: {formatDate(user.user.dateOfBirth)}</p>
      </div>
      <div className="profile-posts">
        <h2>Posts</h2>
        <div className="post-container">
          {user.user.posts ? (
            user.user.posts.map((post) => (

              <div key={post._id} className="post">
                <div className="post-image">
                  <img
                    src={`https://back-end-red-social.onrender.com/${post.imgpost}`}
                    alt=""
                  />
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

export default UserSelected;
