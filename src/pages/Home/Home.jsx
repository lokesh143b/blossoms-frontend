import React from "react";
import "./Home.css";
import Category from "../../components/Category/Category";
import MenuItems from "../../components/MenuItems/MenuItems";
import Cookies from "js-cookie";

const Home = () => {
  const tableNo = Cookies.get("tableNo");
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
        </div>
        &nbsp;Restuarent
      </h1>
      <Category />
      <hr />
      {tableNo ? (
        <h3 className="table-no">Table No : {tableNo}</h3>
      ) : (
        <h3 className="table-no">You can order food from Restuarent only by scanning QR code</h3>
      )}
      <MenuItems />
    </div>
  );
};

export default Home;
