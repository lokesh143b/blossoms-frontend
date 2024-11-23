import React from "react";
import "./Home.css";
import Category from "../../components/Category/Category";
import MenuItems from "../../components/MenuItems/MenuItems";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-heading">
        Welcome To&nbsp;
        <div className="main-heading">
          <span>B</span>
          <span>l</span>
          <span>o</span>
          <span>s</span>
          <span>s</span>
          <span>o</span>
          <span>m</span>
          <span>s</span>
          <span>.</span>
        </div>&nbsp;
        Restuarent
      </h1>
      <Category />
      <hr />
      <MenuItems />
    </div>
  );
};

export default Home;
