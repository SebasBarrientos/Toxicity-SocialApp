import React from 'react'
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username:"",
    email: "",
    password: "",
    dateOfBirth: "",
    image:""
  });
  const { name, email, password, dateOfBirth } = formData;
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
    dispatch(register(formData));
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
        name="username"
        value={username}
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