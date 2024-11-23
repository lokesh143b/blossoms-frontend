import React, { createContext, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [menu, setMenu] = useState("All");
  const [cartItems, setCartItems] = useState({});
  const [previousOrders, setPreviousOrders] = useState({});
  const foodItems =
    menu !== "All"
      ? food_list.filter((item) => item.category === menu)
      : food_list;

  const addTocart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const removeItemFromCart = (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:0}))
  }

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  return (
    <MyContext.Provider
      value={{
        menu,
        setMenu,
        foodItems,
        cartItems,
        setCartItems,
        addTocart,
        removeFromCart,
        removeItemFromCart,
        food_list,
        getTotalAmount,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
