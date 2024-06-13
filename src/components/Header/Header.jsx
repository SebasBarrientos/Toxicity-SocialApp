import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import "./Header.scss";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.key === "Enter") {
      navigate("/search/" + search);
      
    }
  };

  return (
    <nav>
      <h3>Toxicity</h3>

      <div>
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link to="/posts" className="hover:text-blue-500">
          Posts
        </Link>
        {user ? (
          <>
            <Link to="/profile" className="hover:text-blue-500">
              Profile
            </Link>
            <Link to="/createPost" className="hover:text-blue-500">
              Create Post
            </Link>
            <input
              type="text"
              name="search"
              onKeyUp={handleSearch}
              placeholder="Search..."
            />
            <button type="button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-500">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-500">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
