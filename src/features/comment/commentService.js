import axios from "axios";

const API_URL = "https://back-end-red-social.onrender.com/comments";

const addComment = async (comment, id) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_URL}/id/${id}`, comment, {
    headers: { Authorization: token },
  });
  return res.data;
};

const modifyComment = async (_id, body) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${API_URL}/id/${_id}`, body, {
    headers: { Authorization: token },
  });
  return res.data;
};

const commentsService = {
  addComment,
  modifyComment,
};

export default commentsService;
