import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });
  const { name, userName, email, password, dateOfBirth } = form;
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("dateOfBirth", dateOfBirth);

    dispatch(register(formData));
    navigate("/login");
  };

  return (
    <form className="register-form" onSubmit={onSubmit}>
      <label htmlFor="image">Select your profile picture</label>
      <input type="file" name="image" id="" onChange={handleFileChange} />

      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Insert your name"
      />
      <input
        type="text"
        name="userName"
        value={userName}
        onChange={onChange}
        placeholder="Insert your username"
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Insert your email"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Insert your password"
      />
      <input
        type="date"
        name="dateOfBirth"
        value={dateOfBirth}
        onChange={onChange}
        placeholder="Insert your birthday"
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
