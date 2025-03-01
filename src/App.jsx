import React, { useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Pay from "./pages/Pay/Pay";
import { MyContext } from "./context/MyContext";
import Logins from "./pages/Logins/Logins";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";
import InitaiLogin from "./pages/InitialLogin/InitialLogin";
import MyProfile from "./pages/MyProfile/MyProfile";

const App = () => {
  
    /* this is used to loacte the homepage after every refresh */
  
  // useEffect(() => {
  //   if(window.location.pathname === "/login"){
  //     return
  //   }
  //   else {
  //     window.location.href = '/'
  //   }
  // }, []);

  {
    /* this is used to loacte the homepage after every refresh */
  }
  // window.onload = () => {
  //   if (window.location.pathname !== "/") {
  //     window.location.href = "/";
  //   }
  // };

  const { screenMode, token } = useContext(MyContext);

  return (
    <div
      className={
        screenMode === "dark-mode"
          ? "app-container"
          : "app-container light-mode"
      }
    >
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pay"
          element={
            <ProtectedRoute>
              <Pay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <Logins />}
        />

        <Route
          path="/login/:tableNo/:tableId"
          element={<InitaiLogin />}
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
