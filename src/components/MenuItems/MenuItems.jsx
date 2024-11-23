import React, { useContext, useState } from "react";
import "./MenuItems.css";
import { MyContext } from "../../context/MyContext";
import { FaRegStar } from "react-icons/fa";
import { assets } from "../../assets/frontend_assets/assets";

const MenuItems = () => {
  const { foodItems, cartItems, addTocart, removeFromCart } =
    useContext(MyContext);

  return (
    <div className="menu-items-container">
      <h1>Top dishes for you</h1>
      <div className="menu-items-cards">
        {foodItems.map((item, index) => {
          return (
            <div key={index} className="menu-items-card">
              <img src={item.image} alt="" />
              <div className="add-cross-container">
                {cartItems[item._id] ? (
                  <div className="add-cross-active">
                    <img onClick={()=>removeFromCart(item._id)}  src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[item._id]}</p>
                    <img onClick={()=>addTocart(item._id)} src={assets.add_icon_green} alt="" />
                  </div>
                ) : (
                  <img className="add-btn" onClick={()=>addTocart(item._id)} src={assets.add_icon_white} alt="" />
                )}
              </div>
              <div className="menu-items-name-rating">
                <h3>{item.name}</h3>
                <p>
                  5 <FaRegStar color="red" />
                </p>
              </div>
              <p className="menu-items-desc">{item.description}</p>
              <p className="menu-items-price"> ₹ {item.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuItems;
