import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => {state.auth});

  const navigate = useNavigate();
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
            <button
              type="primary"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
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
