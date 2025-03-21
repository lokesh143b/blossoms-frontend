import React, { useContext, useState } from "react";
import "./Cart.css";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Cart = () => {
  const {
    cartItems,
    setCartItems,
    addTocart,
    getTotalAmount,
    removeFromCart,
    removeItemFromCart,
    food_list,
    url,
    token,
  } = useContext(MyContext);
  const navigate = useNavigate();
  const tableNo = Cookies.get("tableNo");
  const [cartLoader, setCartLoader] = useState(false);

  const onClickOrderNow = async () => {
    if (!tableNo) {
      toast.error(
        "You can order food from Restuarent only by scanning QR code!"
      );
      setTimeout(() => navigate("/"), 3500); // Wait 3.5 seconds before redirecting
      return;
    }

    if (getTotalAmount() > 0) {
      try {
        setCartLoader(true);
        const response = await fetch(`${url}/order/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tableNo: tableNo,
            items: cartItems,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          // for (let [itemId, quantity] of Object.entries(cartItems)) {
          //   const filteredItems = food_list.filter((each) => each._id === itemId);
          //   const updatedItem = { ...filteredItems[0], quantity };
          //   setOrders((prev) => [...prev, updatedItem]);
          //   setCartItems({});
          // }

          toast.success("Order placed successfully!");

          setTimeout(() => {
            navigate("/orders");
            setCartItems({});
            setCartLoader(false);
          }, 3500); // Wait 3.5 seconds before redirecting

          return;
        }
      } catch (error) {
        console.log(error);
        setCartLoader(false);
      }
    }
    toast.error("No items in your cart");
  };

  return (
    <div className="cart-container">
      <ToastContainer />
      <div className="cart-loader">
        {cartLoader ? (
          <div className="loader-container">
            <div className="circular-loader"></div>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* ------------cart items--------- */}
      {Object.values(cartItems).some((value) => value > 0) ? (
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p> Quantity </p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url + "/images/" + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>₹ {item.price}</p>
                    {/* quantity */}
                    <p className="cart-quantity">
                      <CiCircleMinus
                        onClick={() => removeFromCart(item._id)}
                        size={20}
                      />
                      {cartItems[item._id]}
                      <CiCirclePlus
                        onClick={() => addTocart(item._id)}
                        size={20}
                      />
                    </p>

                    <p>₹ {item.price * cartItems[item._id]}</p>
                    <p
                      className="cross"
                      onClick={() => removeItemFromCart(item._id)}
                    >
                      <MdDelete size={18} />
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
      ) : (
        <h1 className="cart-empty">Your cart is empty add items</h1>
      )}

      {/* ------------ cart totals---------- */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h1>Cart Totals</h1>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹ {getTotalAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>GST {getTotalAmount() > 500 ? 18 : 0}%</p>
            <p>
              ₹ {getTotalAmount() > 500 ? (getTotalAmount() * 18) / 100 : 0}
            </p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>
              ₹{" "}
              {getTotalAmount() > 500
                ? Math.round(
                    ((getTotalAmount() * 18) / 100 + getTotalAmount()) * 100
                  ) / 100
                : getTotalAmount()}
            </p>
          </div>
          <button disabled={cartLoader} onClick={onClickOrderNow}>
            {cartLoader ? "Loading..." : "ORDER NOW"}
          </button>
        </div>
        {/* ---------promo code-------- */}
        <div className="cart-promocode">
          <p>If you have promo code,Enter it here</p>
          <div>
            <input type="text" placeholder="promocode" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
