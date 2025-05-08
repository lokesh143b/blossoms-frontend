import React, { useContext, useEffect, useState, useCallback } from "react";
import { MyContext } from "../../context/MyContext";
import "./MyOrders.css";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import MyOrderDetails from "../MyOrderDetails/MyOrderDetails";

const MyOrders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { url, token } = useContext(MyContext);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const limit = 5;

  console.log(ordersData);
  const getOrdersData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${url}/paid-orders/my-orders?limit=${limit}&skip=${ordersData.length}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setOrdersData((prev) => [...prev, ...result.data]);
        setHasMore(result.hasMore);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrdersData();
  }, []);

  const handleScroll = useCallback(() => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const pageHeight = document.documentElement.offsetHeight;

    if (scrollPosition >= pageHeight - 100 && !loading && hasMore) {
      getOrdersData();
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="my-orders-container">
      <h1 className="my-orders-heading">My Orders</h1>
      {ordersData.length === 0 && !loading ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {ordersData.map((order) => (
            <li key={order._id}>
              <div className="my-orders-each-section">
                {/* -----------images block------------ */}
                <div className="my-orders-image-section">
                  <img
                    src={`${url}/images/${order.items[0].food.image}`}
                    alt=""
                  />
                  {order.items.length > 1 ? (
                    <p>{order.items.length} more items</p>
                  ) : (
                    ""
                  )}
                </div>
                {/*-------right section--------  */}
                <div className="my-orders-right-section">
                  {/* -------------names block ------------- */}
                  <div className="my-orders-name-section">
                    {order.items.length > 1 ? (
                      <p>
                        {order.items[0].food.name} x {order.items[0].quantity}
                        <br />
                        {order.items[1].food.name} x {order.items[0].quantity}
                        <br />
                        {order.items.length - 2 === 0
                          ? ""
                          : `(${order.items.length - 2} Items)`}
                      </p>
                    ) : (
                      <p>
                        {order.items[0].food.name} x {order.items[0].quantity}
                      </p>
                    )}
                  </div>
                  <p className="my-orders-total">₹{order.totalAmount}</p>

                  <div>
                    <p>Status : {order.payment ? <span style={{color : "green"}}>paid</span> : <span>not paid</span> } </p>
                  </div>
                </div>
              </div>

              {selectedOrderId === order._id ? (
                ""
              ) : (
                <p
                  onClick={() =>
                    setSelectedOrderId(
                      selectedOrderId === order._id ? null : order._id
                    )
                  }
                  className="my-orders-more-details"
                >
                  More details
                </p>
              )}

              {/* ------------my order details----------- */}
              {
                <div
                  className={`order-details ${
                    selectedOrderId === order._id ? "open" : ""
                  }`}
                >
                  <MyOrderDetails MyOrderDetails = {order} />
                </div>
              }
              <hr />
            </li>
          ))}
        </ul>
      )}
      {loading && <p className="load">Loading more orders...</p>}
      {!hasMore && <p className="load">No more orders.</p>}
    </div>
  );
};

export default MyOrders;
