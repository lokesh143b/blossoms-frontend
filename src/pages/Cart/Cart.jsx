import React, { useContext } from "react";
import "./Cart.css";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

const Cart = () => {
  const {
    foodItems,
    cartItems,
    addTocart,
    removeFromCart,
    removeItemFromCart,
    food_list,
    getTotalAmount,
  } = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <div className="cart-container">
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
                    <img src={item.image} alt="" />
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
          <button onClick={() => getTotalAmount()>0? navigate("/orders"):alert("No items in your cart")}>
            PROCEED TO CHECKOUT
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
