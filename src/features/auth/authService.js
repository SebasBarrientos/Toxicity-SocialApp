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
      authorization: token,
    },
  });
  if (res.data) {
    localStorage.clear();
  }
  return res.data;
};

const getUserById = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(API_URL + "/users/id/" + id, {
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
  getUserById,
};

export default authService;
