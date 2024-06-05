import axios from "axios"

const API_URL ="https://back-end-red-social.onrender.com/posts"

const getPosts =async()=>{
    const res = await axios.get(API_URL)
    return res.data //action.payload
}

const getPostById = async (id)=>{
    const res = await axios.get(API_URL +"/id/"+id)
    return res.data
}
const getPostByTitle = async (title)=>{
    const res = await axios.get(API_URL +"/title/"+title)
    return res.data
}

const postsService ={
    getPosts,
    getPostById,
    getPostByTitle
}

export default postsService