import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { BsFillBasket3Fill } from "react-icons/bs";
import { MyContext } from "../../context/MyContext";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();
  // const [toggle, setToggle] = useState(false);
  const { cartItems, screenMode, setScreenMode, user, setUser } =
    useContext(MyContext);

  return (
    <div className="navbar-container">
      <h1 onClick={() => navigate("/")}>Blossoms.</h1>
      {/* -------------------navlinks------------------- */}
      <ul>
        <NavLink to="/">
          <li>
            <FaHome className="icon" /> <p>HOME</p>
          </li>
        </NavLink>
        <NavLink to="/orders">
          <li>
            <IoFastFoodSharp className="icon" /> <p>ORDERS</p>
          </li>
        </NavLink>
        <NavLink className="cart" to="/cart">
          <li>
            <BsFillBasket3Fill className="icon" /> <p>CART</p>
          </li>
          {Object.values(cartItems).some((value) => value > 0) ? (
            <div className="dot">
              {Object.values(cartItems).filter((value) => value > 0).length}
            </div>
          ) : (
            ""
          )}
        </NavLink>
        {/* ----------screen mode------- */}
        <li
          onClick={() =>
            setScreenMode((prev) =>
              prev === "dark-mode" ? "light-mode" : "dark-mode"
            )
          }
        >
          {screenMode === "dark-mode" ? (
            <MdLightMode size={20} />
          ) : (
            <MdDarkMode size={20} />
          )}
        </li>
        {/* -----------hamberger icon---------- */}
        {/* <li>
          {toggle === false ? (
            <GiHamburgerMenu onClick={() => setToggle(true)} size={20} />
          ) : (
            <RxCross1 onClick={() => setToggle(false)} size={20} />
          )}
        </li> */}
      </ul>
      {/* ---------------logins-------------- */}
      {/* {toggle ? (
        <ul className="hamberger-logins">
          <li
            onClick={() => setUser("Admin")}
            className={user === "Admin" ? "active" : ""}
          >
            Admin Login
          </li>
          <li
            onClick={() => setUser("Staff")}
            className={user === "Staff" ? "active" : ""}
          >
            Staff Login
          </li>
          <li
            onClick={() => setUser("Pantry")}
            className={user === "Pantry" ? "active" : ""}
          >
            Pantry Login
          </li>
          <li
            onClick={() => setUser("Table")}
            className={user === "Table" ? "active" : ""}
          >
            Table Login
          </li>
        </ul>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default Navbar;
