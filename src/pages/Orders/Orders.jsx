import React, { useContext, useEffect, useState } from "react";
import "./Orders.css";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Orders = () => {
  const { url } = useContext(MyContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [orderLoader, setOrderLoader] = useState(false);
  const [tableBill, setTableBill] = useState({
    total: 0,
    GST: 0,
    totalAmount: 0,
  });
  
  const tableId = Cookies.get("tableId");

  const getOrders = async () => {
    try {
      setOrderLoader(true);
      const response = await fetch(url + "/table/table-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableId }),
      });

      if (response.ok) {
        const result = await response.json();
        setOrders(result.tableOrders);
        setOrderLoader(false);
        setTableBill((prev) => ({
          ...prev,
          total: result.tableBill.total,
          GST: result.tableBill.GST,
          totalAmount: result.tableBill.totalAmount,
        }));
        console.log(result);
      } else {
        console.log("server error");
        setOrderLoader(false);
      }
    } catch (error) {
      console.log(error);
      setOrderLoader(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const orderTotal = () => {
    let total = 0;
    for (const orderItem of orders) {
      total += orderItem.foodItem.price * orderItem.orderItem.quantity;
    }
    return total;
  };

  const statusClass = (status) => {
    if (status === "Pending") {
      return { fontWeight: "bold" };
    }
    if (status === "Preparing") {
      return { color: "blue", fontWeight: "bold" };
    }
    if (status === "Served") {
      return { color: "green", fontWeight: "bold" };
    }
    if (status === "Cancelled") {
      return { color: "red", fontWeight: "bold" };
    }
  };

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
            <p>Status</p>
          </div>
          <br />
          <hr />
          {orders.map((item, index) => {
            console.log(item)
            return (
              <div key={index}>
                <div className="order-items-title order-items-item">
                  <img src={url + "/images/" + item.foodItem.image} alt="" />
                  <p>{item.foodItem.name}</p>
                  <p>
                    ₹ {item.foodItem.price} x {item.orderItem.quantity} = 
                    {item.foodItem.price * item.orderItem.quantity}
                  </p>
                  <p>{item.orderItem.quantity}</p>
                  <p style={statusClass(item.orderItem.status)}>
                    {item.orderItem.status}
                  </p>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {orderLoader ? (
            <div className="loader-container">
              <div className="circular-loader"></div>
            </div>
          ) : (
            <h1 className="order-empty">Your order is empty add items</h1>
          )}
        </>
      )}

      {/* ------------ cart and order totals---------- */}
      <div className="order-bottom">
        <div className="order-total">
          <h1>Order Totals</h1>
          <div className="order-total-details">
            <p>Subtotal</p>
            <p>₹ {tableBill.total}</p>
          </div>
          <hr />
          <div className="order-total-details">
            <p>GST {tableBill.total > 500 ? 18 : 0}%</p>
            <p>₹ {tableBill.GST}</p>
          </div>
          <hr />
          <div className="order-total-details">
            <p>Total</p>
            <p>₹ {tableBill.totalAmount}</p>
          </div>
          <button
            onClick={() =>
              orderTotal() > 0
                ? navigate("/pay")
                : alert("No items in your order")
            }
          >
            GENERATE BILL
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
