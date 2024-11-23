import React, { useContext } from "react";
import "./Pay.css";
import { MyContext } from "../../context/MyContext";
import { QRCodeSVG } from "qrcode.react";

const Pay = () => {
  const { getTotalAmount } = useContext(MyContext);

  const UPI_ID = "6303300378@ybl";
  const payeeName = "Blossoms Restuarent";
  const transactionAmount =
    getTotalAmount() > 500
      ? Math.round(((getTotalAmount() * 18) / 100 + getTotalAmount()) * 100) /
        100
      : getTotalAmount();
  const currency = "INR";

  const upiURL = `upi://pay?pa=${UPI_ID}&pn=${payeeName}&am=${transactionAmount}&cu=${currency}`;

  return (
    <div className="pay-container">
      {/* ------------cash billing-------- */}
      <div className="billing-container">
        <h1>Billing details</h1>
        <div>
          <p>Subtotal :</p> <p>₹ {getTotalAmount()}</p>
        </div>
        <div>
          <p>GST {getTotalAmount() > 500 ? 18 : 0}% :</p>{" "}
          <p>₹ {getTotalAmount() > 500 ? (getTotalAmount() * 18) / 100 : 0}</p>
        </div>
        <hr />
        <div>
          <p>Total :</p>
          <p>
            ₹{" "}
            {getTotalAmount() > 500
              ? Math.round(
                  ((getTotalAmount() * 18) / 100 + getTotalAmount()) * 100
                ) / 100
              : getTotalAmount()}
          </p>
        </div>
      </div>
      {/* ----------QR code--------- */}
      <h1 className="or">(OR)</h1>
      <div className="qr-container">
        <p>QR code</p>
        <QRCodeSVG  value={upiURL} size={200} />,
      </div>
    </div>
  );
};

export default Pay;
