import axios from "axios";

const API_URL = "https://back-end-red-social.onrender.com/comments";

const addComment = async (comment, id) => {
  const token = localStorage.getItem("token");
  console.log(comment);
  const res = await axios.post(`${API_URL}/id/${id}`, comment, {
    headers: { Authorization: token },
  });
  return res.data
};


const commentsService = {
   addComment
}

export default commentsService