import { ApiProvider } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const API_URL = "https://back-end-red-social.onrender.com/posts";

const getPosts = async (page) => {
  const res = await axios.get(API_URL + "?page=" + page);
  return res.data;
};

const getPostById = async (_id) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(API_URL + "/id/" + _id, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
const getPostByTitle = async (title) => {
  const res = await axios.get(API_URL + "/title/" + title);
  return res.data;
};
const addPost = async (formData) => {
  const token = localStorage.getItem("token");
  console.log(token);
  await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
};

const updatePost = async (_id, body) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${API_URL}/id/${_id}`, body, {
    headers: { Authorization: token },
  });
  return res.data.post;
};

const deletePost = async (_id) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${API_URL}/id/${_id}`, {
    headers: { Authorization: token },
  });
  return res.data.post;
};

const like = async (_id) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(
    API_URL + "/likes/" + _id,
    {},
    { headers: { Authorization: token } }
  );
  return res.data;
};

const dislike = async (_id) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(
    API_URL + "/dislikes/" + _id,
    {},
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
};
const postsService = {
  getPosts,
  getPostById,
  getPostByTitle,
  addPost,
  like,
  dislike,
  deletePost,
  updatePost
};

export default postsService;
