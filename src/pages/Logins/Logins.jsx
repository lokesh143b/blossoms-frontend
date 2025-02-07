import React, { useContext, useState } from "react";
import "./Logins.css";
import { MyContext } from "../../context/MyContext";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const Logins = () => {
  const { url } = useContext(MyContext);
  const [loginType, setLoginType] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  // ----------login handle --------------
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }

    try {
      const response = await fetch(`${url}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        setEmail("");
        setPassword("");
        console.log("Login Success Message:", result);
        setErrorMessage(result.message);
        Cookies.set("token", result.token, { expires: 2 / 24 });
        navigate("/");
      } else {
        setErrorMessage(result.message || "Failed to log in");
        console.log(result.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.log(error);
    }
  };

  // ---------sign up handle--------------
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      const response = await fetch(`${url}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        console.log("Registration Success:", result);
        setErrorMessage(result.message);
      } else {
        setErrorMessage(result.message || "Failed to register");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  //  ------------log type handle------------
  const onclickLogType = () => {
    setLoginType(loginType === "login" ? "sign-up" : "login");
    setErrorMessage("");
  };

  return (
    <div className="logins-container">
      <form
        onSubmit={loginType === "login" ? handleLogin : handleSignUp}
        className="login-card"
      >
        <h1>{loginType === "login" ? "Login" : "Sign Up"}</h1>
        {loginType === "sign-up" && (
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <aside className="show-password">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </aside>
        <button type="submit">
          {loginType === "login" ? "Login" : "Sign Up"}
        </button>

        {/* -------------error message---------------- */}
        {errorMessage && <p className="error-msg">*{errorMessage}</p>}
        <p>
          {loginType === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span onClick={onclickLogType}>
            {loginType === "login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Logins;
