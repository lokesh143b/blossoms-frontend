import React, { useContext, useState } from "react";
import "./Orders.css";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { orders, orderTotal } = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <div className="order-container">
      {/* ------------cart items--------- */}
      {orders.length > 0 ? (
        <div className="order-items">
          <div className="order-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>
          <br />
          <hr />
          {orders.map((item, index) => {
            return (
              <div key={index}>
                <div className="order-items-title order-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹ {item.price}</p>
                  <p>{item.quantity}</p>
                  <p>₹ {item.quantity * item.price}</p>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      ) : (
        <h1 className="order-empty">Your order is empty add items</h1>
      )}

      {/* ------------ cart and order totals---------- */}
      <div className="order-bottom">
        <div className="order-total">
          <h1>Order Totals</h1>
          <div className="order-total-details">
            <p>Subtotal</p>
            <p>₹ {orderTotal()}</p>
          </div>
          <hr />
          <div className="order-total-details">
            <p>GST {orderTotal() > 500 ? 18 : 0}%</p>
            <p>₹ {orderTotal() > 500 ? (orderTotal() * 18) / 100 : 0}</p>
          </div>
          <hr />
          <div className="order-total-details">
            <p>Total</p>
            <p>
              ₹{" "}
              {orderTotal() > 500
                ? Math.round(((orderTotal() * 18) / 100 + orderTotal()) * 100) /
                  100
                : orderTotal()}
            </p>
          </div>
          <button
            onClick={() =>
              orderTotal() > 0
                ? navigate("/pay")
                : alert("No items in your order")
            }
          >
            PAY
          </button>
        </div>
        {/* ---------promo code-------- */}
        <div className="order-promocode">
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

export default Orders;
