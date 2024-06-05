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
    localStorage.setItem('tokem',JSON.stringify(res.data.token))
  }
  return res.data
};

const authService = {
  register,
  login
};

export default authService;
