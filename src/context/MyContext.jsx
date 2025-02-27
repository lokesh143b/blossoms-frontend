import React, { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [menu, setMenu] = useState("All");
  const [cartItems, setCartItems] = useState({});
  const [screenMode, setScreenMode] = useState(Cookies.get("screenMode"));
  const [user, setUser] = useState();
  const [food_list, setFoodListItems] = useState([]);
  const [foodLoader, setFoodLoader] = useState(false);
  const token = Cookies.get("token");
  const url = "https://blossoms-backend-app.onrender.com" ;
  
  const navigate = useNavigate();

  const fetchFoodData = async () => {
    try {
      setFoodLoader(true);
      const response = await fetch(url + "/food/list");
      const result = await response.json();
      setFoodListItems(result.data || []);
      setFoodLoader(false);
      console.log(result);
    } catch (error) {
      console.log(error);
      setFoodLoader(false);
    }
  };

  useEffect(() => {
    if (!token){
      return;
    }
    fetchFoodData();
  }, [token]);

  // Initially fetch the cart data
  useEffect(() => {
    if (!token){
      return;
    }
    const fetchCartData = async () => {
      try {
        const response = await fetch(`${url}/user/getCartData`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();

          setCartItems(result.cartData || {});
          console.log(result);
          if (result.success === false) {
            return navigate("/login");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartData();
  }, [token]);

  // Add to cart
  const addTocart = async (itemId) => {
    try {
      const response = await fetch(`${url}/user/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        const result = await response.json();
        setCartItems(result.cartData || {});
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(`${url}/user/removeFromCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        const result = await response.json();
        setCartItems(result.cartData || {});
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart with total quantity
  const removeItemFromCart = async (itemId) => {
    try {
      const response = await fetch(`${url}/user/removeItemFromCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        const result = await response.json();
        setCartItems(result.cartData || {});
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;

    for (const [itemId, quantity] of Object.entries(cartItems)) {
      const product = food_list.find((product) => product._id === itemId);

      if (product) {
        totalAmount += Number(product.price) * quantity;
      }
    }
    return totalAmount;
  };

  

  return (
    <MyContext.Provider
      value={{
        menu,
        setMenu,
        cartItems,
        setCartItems,
        addTocart,
        removeFromCart,
        removeItemFromCart,
        food_list,
        foodLoader,
        getTotalAmount,
        
        screenMode,
        setScreenMode,
        
        user,
        setUser,
        url,
        token,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
