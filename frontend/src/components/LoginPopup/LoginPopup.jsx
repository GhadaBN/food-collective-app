import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const authenticateUser = async (authData) => {
    const response = await axios.post(url + "/auth/login", authData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.authToken) {
      setToken(response.data.authToken);
      localStorage.setItem("token", response.data.authToken);
      setShowLogin(false);
    } else {
      alert(response.data.message || "Authentication failed.");
    }
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url + (currState === "Login" ? "/auth/login" : "/auth/signup");

    try {
      const response = await axios.post(newUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (currState === "Signup" && response.data) {
        // If signing up, attempt to log in the user
        await authenticateUser({ email: data.email, password: data.password });
      } else if (response.data.authToken) {
        console.log("Token received:", response.data.authToken);
        setToken(response.data.authToken);
        localStorage.setItem("token", response.data.authToken);
        setShowLogin(false);
      } else {
        console.log("Authentication failed, response:", response.data);
        alert(response.data.message || "Authentication failed.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert(
        "Failed to authenticate. Please try again. " +
          (error.response ? error.response.data.message : "")
      );
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-title-container">
          <p className="login-popup-title">{currState}</p>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Signup" ? "Create account" : "Connect to account"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the terms and conditions of tomato social club.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Signup")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
