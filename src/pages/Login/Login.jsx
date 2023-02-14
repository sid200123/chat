import { async } from "@firebase/util";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Fake Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter Email" />
          <input type="password" placeholder="Enter Password" />
          <button>Sign In</button>
        </form>
        <p>
          you don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
