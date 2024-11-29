import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Pay from "./pages/Pay/Pay";
import { MyContext } from "./context/MyContext";
import Logins from "./components/Logins/Logins";

const App = () => {
  {
    /* this is used to loacte the homepage after every refresh */
  }
  // useEffect(() => {
  //   if (window.location.pathname !== "/") {
  //     window.location.href = '/'
  //   }
  // }, []);

  {
    /* this is used to loacte the homepage after every refresh */
  }
  window.onload = () => {
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  };

  const { screenMode, user } = useContext(MyContext);

  return (
    <div className={screenMode === "dark-mode" ? "app-container" : "light-mode"}>
      <Navbar />
      {user !== undefined ? <Logins /> : ""}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
