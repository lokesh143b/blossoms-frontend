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
import Cookies from 'js-cookie'


const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems, screenMode, setScreenMode } = useContext(MyContext);

  const onClickLogout = () =>{
    Cookies.remove("token")
    Cookies.remove("tableNo")
    Cookies.remove("tableId")
    navigate("/login")
  }

  const onClickScreenMode = () => {
    Cookies.get("screenMode") === "dark-mode" ? Cookies.set("screenMode" , "light-mode") : 
    Cookies.set("screenMode" , "dark-mode")
    setScreenMode((prev) =>
      prev === "dark-mode" ? "light-mode" : "dark-mode"
    )
  }

  return (
    <div className="navbar-container">
      <h1 onClick={() => navigate("/")}>Blossoms.</h1>
      {/* -------------------navlinks------------------- */}
      <ul>
        {/* home icon link */}
        {/* <NavLink to="/">
          <li>
            <FaHome className="icon" /> <p>HOME</p>
          </li>
        </NavLink> */}
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
            onClickScreenMode()
          }
        >
          {screenMode === "dark-mode" ? (
            <MdLightMode size={20} />
          ) : (
            <MdDarkMode size={20} />
          )}
        </li>
        {/* -----------hamberger menu---------- */}
        <li className={location.pathname === "/login" ? "" : "hamberger-container"}>
          <GiHamburgerMenu size={20} />
          <div className="drop-down-menu">
            <h6 onClick={() => navigate("/my-profile")}>My Profile</h6>
            <h6
              onClick={onClickLogout}
            >
              Logout
            </h6>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
