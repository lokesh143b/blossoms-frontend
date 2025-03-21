import React, { useContext, useRef, useState } from "react";
import "./Logins.css";
import { MyContext } from "../../context/MyContext";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const Logins = () => {
  const { url } = useContext(MyContext);
  const [loginType, setLoginType] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [clickOTP, setClickOTP] = useState(false);
  const [OTPSent, setOTPSent] = useState(false);

  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits or empty input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.every((digit) => digit !== "")) {
      handleOTPComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pastedData)) return; // Ensure only digits

    const newOtp = pastedData
      .split("")
      .concat(Array(length).fill(""))
      .slice(0, length);
    setOtp(newOtp);

    // Move focus to last entered digit
    const lastIndex = newOtp.findIndex((v) => v === "");
    if (lastIndex !== -1) {
      inputRefs.current[lastIndex]?.focus();
    } else {
      inputRefs.current[length - 1]?.focus();
    }

    // Verify OTP on complete input
    if (newOtp.every((digit) => digit !== "")) {
      handleOTPComplete(newOtp.join(""));
    }
  };

  const handleOTPComplete =async (otpValue) => {
    console.log("OTP Entered:", otpValue);
     // Replace with API call
    
    setIsLoaderActive(true);

    try {
      const response = await fetch(`${url}/auth/verify-login-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrPhone: emailOrPhone.trim(),
          otp: otpValue,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setErrorMessage("");
        toast.success("Login successful!");
        Cookies.set("token", result.token, { expires: 2 / 24 });
        navigate("/");
      } else {
        setErrorMessage(result.message || "Failed to log in");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
    setIsLoaderActive(false);
  };

  // ----------login handle --------------
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailOrPhone || !password) {
      setErrorMessage("Email or phone and password are required");
      return;
    }

    try {
      setIsLoaderActive(true);
      const response = await fetch(`${url}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      const result = await response.json();
      if (response.ok) {
        setPassword("");
        setEmailOrPhone("");
        console.log("Login Success Message:", result);
        setErrorMessage(result.message);
        Cookies.set("token", result.token, { expires: 2 / 24 });
        setIsLoaderActive(false);
        navigate("/");
      } else {
        setIsLoaderActive(false);
        setErrorMessage(result.message || "Failed to log in");
        console.log(result.message);
      }
    } catch (error) {
      setIsLoaderActive(false);
      setErrorMessage("An error occurred. Please try again.");
      console.log(error);
    }
  };

  // ---------sign up handle--------------
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !phone) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      setIsLoaderActive(true);
      const response = await fetch(`${url}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password, phone }),
      });

      const result = await response.json();
      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        setPhone("");
        setIsLoaderActive(false);
        navigate(`${url}/login`);
        console.log("Registration Success:", result);
        setErrorMessage(result.message);
      } else {
        setIsLoaderActive(false);
        setErrorMessage(result.message || "Failed to register");
      }
    } catch (error) {
      setIsLoaderActive(false);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  //  ------------log type handle------------
  const onclickLogType = () => {
    setLoginType(loginType === "login" ? "sign-up" : "login");
    setErrorMessage("");
    setUsername("");
    setEmail("");
    setPassword("");
    setPhone("");
    setEmailOrPhone("");
  };

  const onClickSendOTP = async () => {
    if (!emailOrPhone.trim()) {
      setErrorMessage("Email or phone required");
      return;
    }
    setIsLoaderActive(true);

    try {
      const response = await fetch(`${url}/auth/request-login-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: emailOrPhone.trim() }),
      });

      const result = await response.json();
      if (response.ok) {
        setErrorMessage("");
        setOTPSent(true);
        toast.success("OTP sent successfully!");
      } else {
        setErrorMessage(result.message || "Failed to send OTP");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
    setIsLoaderActive(false);
  };

  // const onclickOTPLogin = async () => {
  //   if (!otp.trim()) {
  //     setErrorMessage("OTP required");
  //     return;
  //   }
  //   setIsLoaderActive(true);

  //   try {
  //     const response = await fetch(`${url}/auth/verify-login-otp`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         emailOrPhone: emailOrPhone.trim(),
  //         otp: otp.trim(),
  //       }),
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       setErrorMessage("");
  //       toast.success("Login successful!");
  //       Cookies.set("token", result.token, { expires: 2 / 24 });
  //       navigate("/");
  //     } else {
  //       setErrorMessage(result.message || "Failed to log in");
  //     }
  //   } catch (error) {
  //     setErrorMessage("An error occurred. Please try again.");
  //   }
  //   setIsLoaderActive(false);
  // };

  const renderLoginWithOTP = () => {
    return (
      <div className="login-card">
        {OTPSent ? (
          ""
        ) : (
          <div>
            <label htmlFor="emailOrPhone">Email or Phone</label>
            <input
              type="text"
              id="emailOrPhone"
              placeholder="Enter your email or phone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
          </div>
        )}
        {/* -----------after otp sent--------- */}
        {OTPSent ? (
          // <div>
          //   <label htmlFor="OTP">OTP</label>
          //   <input
          //     type="text"
          //     id="OTP"
          //     placeholder="Enter your OTP"
          //     value={OTP}
          //     onChange={(e) => setOTP(e.target.value)}
          //   />
          // </div>
          <>
            <h3>Enter Your OTP</h3>
            <div className="otp-container">
              {Array(length)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="otp-input"
                  />
                ))}
            </div>
          </>
        ) : (
          ""
        )}
        {/*-----------click on send otp--------- */}
        {OTPSent ? (
          // <button onClick={onclickOTPLogin} className="btn">
          //   login
          // </button>
          ""
        ) : (
          <button
            disabled={isLoaderActive}
            onClick={onClickSendOTP}
            type="button"
            className="btn"
          >
            {isLoaderActive ? (
              <span className="loader">
                <span></span>
                <span></span>
                <span></span>
              </span>
            ) : (
              "send OTP"
            )}
          </button>
        )}

        {/* -------------error message---------------- */}
        {errorMessage && <p className="error-msg">*{errorMessage}</p>}

        {/* -------------login with OTP------------ */}
        <p>
          {loginType === "login" && "login with "}
          <span onClick={() => setClickOTP((prevState) => !prevState)}>
            {clickOTP ? "password" : "OTP"}
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className="logins-container">
      {/* ----------- loader ----------- */}
      <div className="login-loader">
        {isLoaderActive ? (
          <div className="login-loader-container">
            <div className="login-circular-loader"></div>
          </div>
        ) : (
          ""
        )}
      </div>

      {clickOTP ? (
        renderLoginWithOTP()
      ) : (
        <form
          onSubmit={loginType === "login" ? handleLogin : handleSignUp}
          className="login-card"
        >
          <h1>{loginType === "login" ? "Login" : "Sign Up"}</h1>

          <>
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

            {loginType === "sign-up" && (
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            )}

            {loginType === "sign-up" ? (
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
            ) : (
              <div>
                <label htmlFor="emailOrPhone">Email or Phone</label>
                <input
                  type="text"
                  id="emailOrPhone"
                  placeholder="Enter your email or phone"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                />
              </div>
            )}

            {/* -------------OTP block---------------- */}
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
            {isLoaderActive ? (
              <button className="btn">
                <span className="loader">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            ) : (
              <button className="btn" type="submit">
                {loginType === "login" ? "Login" : "Sign Up"}
              </button>
            )}
          </>

          {/* -------------error message---------------- */}
          {errorMessage && <p className="error-msg">*{errorMessage}</p>}

          {/* -------------login with OTP------------ */}
          <>
            {loginType === "login" && (
              <p>
                login with
                <span onClick={() => setClickOTP((prevState) => !prevState)}>
                  {clickOTP ? " password" : " OTP"}
                </span>
              </p>
            )}
          </>

          <p>
            {loginType === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <span onClick={onclickLogType}>
              {loginType === "login" ? "Sign Up" : "Login"}
            </span>
          </p>
        </form>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Logins;
