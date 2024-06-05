import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate;
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    image: "",
  });
  const { name, userName, email, password, dateOfBirth } = formData;
  //   const { isSuccess, message, isError } = useSelector((state) => state.auth);

  //   useEffect(() => {
  //     if (isSuccess) {
  //       notification.success({
  //         message: "Success",
  //         description: message,
  //       });
  //     }
  //     if (isError) {
  //       notification.error({
  //         message: "Error!!!",
  //         description: message,
  //       });
  //     }
  //     dispatch(reset())
  //   }, [isSuccess, message, isError]);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(register(formData));
    navigate("/login")
  };
  return (
    <form onSubmit={onSubmit}>
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
