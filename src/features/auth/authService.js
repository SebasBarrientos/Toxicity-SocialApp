import axios from "axios";

const API_URL = "http://localhost:3000/";

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

const authService = {
  register,
  login,
  logout,
  getLoggedUser,
};

export default authService;
