import React, { useContext } from "react";
import "./Pay.css";
import { MyContext } from "../../context/MyContext";
import { QRCodeSVG } from "qrcode.react";

const Pay = () => {
  const {  } = useContext(MyContext);
  const orderTotal  = () => {
    
  }

  const UPI_ID = "6303300378@ybl";
  const payeeName = "Blossoms Restuarent"; 
  const transactionAmount =
    orderTotal() > 500
      ? Math.round(((orderTotal() * 18) / 100 + orderTotal()) * 100) / 100
      : orderTotal();
  const currency = "INR";

  const upiURL = `upi://pay?pa=${UPI_ID}&pn=${payeeName}&am=${transactionAmount}&cu=${currency}`;

  return (
    <div className="pay-container">
      {/* ------------cash billing-------- */}
      <div className="billing-container">
        <h1>Billing details</h1>
        <div>
          <p>Subtotal :</p> <p>₹ {orderTotal()}</p>
        </div>
        <div>
          <p>GST {orderTotal() > 500 ? 18 : 0}% :</p>{" "}
          <p>₹ {orderTotal() > 500 ? (orderTotal() * 18) / 100 : 0}</p>
        </div>
        <hr />
        <div>
          <p>Total :</p>
          <p>
            ₹{" "}
            {orderTotal() > 500
              ? Math.round(((orderTotal() * 18) / 100 + orderTotal()) * 100) /
                100
              : orderTotal()}
          </p>
        </div>
      </div>
      {/* ----------QR code--------- */}
      <h1 className="or">(OR)</h1>
      <div className="qr-container">
        <p>QR code</p>
        <QRCodeSVG value={upiURL} size={200} />,
      </div>
    </div>
  );
};

export default Pay;
