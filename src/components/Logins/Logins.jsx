import React, { useContext, useState } from "react";
import "./Logins.css";
import { MyContext } from "../../context/MyContext";
import { RxCross1 } from "react-icons/rx";


const Logins = () => {
  const { user, setUser} = useContext(MyContext);
  const [loginType, setLoginType] = useState("login");
  
  return (
    <div className={user !== undefined ? "logins-container" : "close-pop-up"}>
      <div className="pop-up-cross">
      <RxCross1 onClick={()=>setUser()} size={20} />
      </div>
      {/* -----------login block--------------- */}
      {loginType === "login" ? (
        <div className="login-card">
          <h1>{user} Login</h1>
          <div>
            <label htmlFor="user">User</label>
            <input id="user" type="text" placeholder="user" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              is="password"
              type="password"
              placeholder="password"
              required
            />
          </div>
          <button>Login</button>
          <p>Forget password</p>
          <p>
            Create account?{" "}
            <span onClick={() => setLoginType("sign-up")}>SignUp</span>
          </p>
        </div>
      ) : (
        <div className="login-card">
          {/* ------------------signup block---------------- */}
          <h1>{user} SignUp</h1>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="user" required />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="mail" placeholder="user" required />
          </div>
          <div>
            <label htmlFor="signupPassword">Password</label>
            <input
              id="signupPassword"
              type="password"
              placeholder="password"
              required
            />
          </div>
          <button>SignUp</button>
          <p>Forget password</p>
          <p>
            Logging your account?{" "}
            <span onClick={() => setLoginType("login")}>Login</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Logins;
