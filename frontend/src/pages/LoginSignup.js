import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginSignup.css";
import swordImg from "../assets/swords.png";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    const endpoint = isLogin
      ? "http://localhost:5000/api/login"
      : "http://localhost:5000/api/signup";

    try {
      console.log("Sending request to " + endpoint);
      console.log("Username:", username);
      console.log("Password:", password);
      const response = await axios.post(endpoint, { username, password });
      console.log(response.data);
      const { token, username: returnedUsername } = response.data;

      if (token && returnedUsername) {
        // Save session info
        localStorage.setItem("token", token);
        localStorage.setItem("username", returnedUsername);
        console.log(
          "Token and username saved to localStorage" +
            token +
            " " +
            returnedUsername
        );
        console.log(isLogin);
        if (isLogin) {
          navigate("/home"); // Use navigate instead of window.location.href
        } else {
          setErrorMsg("Signup successful. Please login.");
          setIsLogin(true);
          setUsername("");
          setPassword("");
        }
      } else {
        setErrorMsg("No token or username received from server.");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="header-text">
          <h1>DAILY CP BATTLE</h1>
          <h3>WANNA FIGHT WITH CODE?</h3>
        </div>
        <img src={swordImg} alt="Crossed Swords" className="sword-image" />
      </div>

      <div className="login-box">
        <h2>{isLogin ? "Login to CP Battle" : "Create an Account"}</h2>
        <form onSubmit={handleSubmit}>
          {errorMsg && <p className="error">{errorMsg}</p>}

          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p className="switch-mode">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setErrorMsg("");
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;
