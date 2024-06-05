import axios from "axios";

const API_URL = "https://back-end-red-social.onrender.com"

const register = async (userData) => {
    const res = await axios.post(API_URL + "/users", userData);
    return res.data;
};


const authService = {
    register,
};

export default authService;