import axios from "axios";

const API_URL = "https://back-end-red-social.onrender.com";

const register = async (userData) => {
  const res = await axios.post(API_URL + "/users", userData);
  return res.data;
};

export const login = async (user) => {
  const res = await axios.post(API_URL + "/users/login", user);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

const logout = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(API_URL + "/users/logout", {
    headers: {
      Authorization: token,
    },
  });
  if (res.data) {
    localStorage.clear();
  }
  return res.data;
};

const getLoggedUser = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(API_URL + "/users/" , {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const getSelectedUser = async (_id) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(API_URL + "/users/id/"+_id , {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const searchByUserName = async (searchedName) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(API_URL + "/users/getByName?name="+searchedName , {
    headers: {
      authorization: token,
    },
  });
  return res.data.user;
};
const followUser = async (_id) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(API_URL + "/users/follow/"+_id ,"", {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const unfollowUser = async (_id) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(API_URL + "/users/unfollow/"+_id ,"", {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const authService = {
  register,
  login,
  logout,
  getLoggedUser,
  getSelectedUser,
  followUser,
  unfollowUser,
  searchByUserName
};

export default authService;
