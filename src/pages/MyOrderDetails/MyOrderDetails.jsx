import React, { useContext } from "react";
import "./MyOrderDetails.css";
import { MyContext } from "../../context/MyContext";

const MyOrderDetails = (props) => {
  const { url } = useContext(MyContext);
  const { MyOrderDetails } = props;
  const { _id, createdAt, items, payment, total, totalAmount, GST } =
    MyOrderDetails;
  console.log(items);
  return (
    <div className="my-order-details-container">
      <h1>Your order details</h1>

      {/* ----------orders data---------- */}
      <p>Order id : {_id}</p>
      <p>
        Ordered At:{" "}
        {new Date(createdAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>

      {
        <>
          <div className="my-order-details-items">
            <div className="my-order-details-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p> Quantity </p>
              <p>Total</p>
              <p>Status</p>
            </div>
            <br />
            <hr />
          </div>
          {items.map((item, index) => {
            return (
              <div key={index}>
                <div className="my-order-details-items-title my-order-details-items-item">
                  <img src={url + "/images/" + item.food.image} alt="" />
                  <p>{item.food.name}</p>
                  <p>₹ {item.food.price}</p>
                  {/* quantity */}
                  <p className="my-order-details-quantity">{item.quantity}</p>

                  <p>₹ {item.quantity * item.food.price}</p>
                  <p>{item.status}</p>
                </div>
                <hr />
              </div>
            );
          })}
        </>
      }

      {/* -----------order totals------------ */}
      <div className="my-order-details">
        <div className="my-order-details-total">
          <h1>Order Totals</h1>
          <div className="my-order-details-total-details">
            <p>Subtotal</p>
            <p>₹ {total}</p>
          </div>
          <hr />
          <div className="my-order-details-total-details">
            <p>GST </p>
            <p>₹ {GST}</p>
          </div>
          <hr />
          <div className="my-order-details-total-details">
            <p>Total</p>
            <p>₹ {totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderDetails;
