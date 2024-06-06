import axios from "axios"

const API_URL = "https://back-end-red-social.onrender.com/posts"

const getPosts = async (page) => {
    const res = await axios.get(API_URL+"?page="+page) ///posts?page=1
    return res.data 
}

const getPostById = async (_id) => {
    const token = localStorage.getItem("token")
    const res = await axios.get(API_URL + "/id/" +_id, {
        headers: {
            Authorization: token
        }
    })
    return res.data
}
const getPostByTitle = async (title) => {
    const res = await axios.get(API_URL + "/title/" + title)
    return res.data
}
const addPost = async (formData) => {
    const token = localStorage.getItem("token");
    console.log(token);
    await axios.post(API_URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token
        }
    });
}

const postsService = {
    getPosts,
    getPostById,
    getPostByTitle,
    addPost
}

export default postsService