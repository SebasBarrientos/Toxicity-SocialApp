import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { addPost } from "../../features/posts/postsSlice";

const CreatePost = () => {
    const dispatch = useDispatch();
    
    const navigate = useNavigate()
    const [file, setFile] = useState(null);
   
    const handleFileChange = async (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        formData.append("caption", e.target.caption.value);
        formData.append("location", e.target.location.value);
        dispatch(addPost(formData))
         navigate("/")
        notification.success({
            message: 'Registered succesfully'})
    }
    return (
        <div>
            <div className="flex justify-center mt-5">
                <form className="flex flex-col w-full max-w-sm" onSubmit={handleSubmit}>
                    <input type="file" name="image" id="" onChange={handleFileChange} />
                    <input
                        className="border-4 border-black mt-4 p-2 rounded-md focus:outline-none"
                        type="text"
                        name="caption"
                        placeholder="Enter the products caption"
                    />
                    <input
                        className="border-4 border-black mt-4 p-2 rounded-md focus:outline-none"
                        type="text"
                        name="location"
                        placeholder="Enter the location"
                    />
                    <button className="button mt-4 bg-black text-white p-2 rounded-md hover:bg-blue-800">
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost