import React, { useContext, useState } from "react";
import "./Category.css";
import { menu_list } from "../../assets/frontend_assets/assets";
import { MyContext } from "../../context/MyContext";

const Category = () => {
  const{menu , setMenu} = useContext(MyContext)

  return (
    <div className="category-container">
      {menu_list.map((item, index) => {
        return (
          <div
            onClick={() =>
              menu !== item.menu_name ? setMenu(item.menu_name) : setMenu("All")
            }
            key={index}
          >
            <img
              className={menu === item.menu_name ? "select-menu" : ""}
              src={item.menu_image}
              alt=""
            />
            <p className={menu === item.menu_name ? "select-text" : ""}>
              {item.menu_name}
            </p>
          </div>
        );
      })}

    </div>
  );
};

export default Category;
