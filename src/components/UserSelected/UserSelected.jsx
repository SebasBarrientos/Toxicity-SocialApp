import React, { useEffect, useState } from "react";
import authService from "../../features/auth/authService";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";



const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

//VER CON SOFI y actualizar tema de que si sigo a alguien se actualice
const UserSelected = () => {
  const { _id } = useParams();
  const [user, setUser] = useState("")
  const {  user: myUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      const searchedUser = await authService.getSelectedUser(_id);
      setUser(searchedUser.user);
      };
      fetchUser();
    
  }, [])
  const follow = async(_id) => {
   const res= await authService.followUser(_id)
   const {followers} = user
   followers.push(myUserId)
   const newUser = {...res.user,followers}
   setUser(newUser)
  }
  const unfollow = async(_id) => {
    const res = await authService.unfollowUser(_id)
    const {followers} = user
    const actualFollowers = followers.filter(follower => follower._id !==myUserId._id)
    const newUser = {...res.user,followers:actualFollowers}
    setUser(newUser)

  }

  if (!user) {
    return <div className="loading">CARGANDO</div>;
  }



  return (
    <div className="profile">
      {console.log(user.followers.length)}
      <div className="profile-header">
        <h1>{user.userName}</h1>
        <img src={"http://localhost:3000/" + user.profilePic} alt="" />

      </div>
      {console.log(user.followers)   }
      {user.followers.some((follower) =>  follower._id == myUserId._id) == false ? <button onClick={() => follow(_id)}>Follow</button> : <button onClick={() => unfollow(_id)}>Unfollow</button>}


      <div className="profile-details">
        <p>Followers: </p>
        {user.followers.map((follower) => (
          <p key={follower._id}>{follower.userName}</p>
        ))}

        <p>Fecha de nacimiento: {formatDate(user.dateOfBirth)}</p>
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
                      src={`http://localhost:3000/${post.imgpost}`}
                      alt=""
                    />
                  </Link>
                  <div className="post-location">{post.location}</div>
                  <div className="post-likes">Likes: {post.likes.length}</div>
                  <div className="post-comments">
                    Comments: {post.commentsIds.length}
                  </div>
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
