import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { MyContext } from "../../context/MyContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(MyContext);
  

  return (
    <div className="navbar-container">
      <h1 onClick={() => navigate("/")}>Blossoms.</h1>
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
            <FaCartShopping className="icon" /> <p>CART</p>
          </li>
          {Object.values(cartItems).some((value) => value > 0) ? (
            <div className="dot"></div>
          ) : (
            ""
          )}
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
