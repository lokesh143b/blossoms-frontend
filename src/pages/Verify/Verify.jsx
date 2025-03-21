import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MyContext } from "../../context/MyContext";

const Verify = () => {
  const { url } = useContext(MyContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true"; // Convert to boolean
  const tableId = searchParams.get("tableId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!tableId) return; // Prevent API call if tableId is missing

    const verifyFunc = async () => {
      try {
        const response = await fetch(url + "/table/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ success, tableId }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          navigate("/");
        } else {
          console.error("Server error");
        }
      } catch (error) {
        console.error("Request failed:", error);
        navigate("/orders")
      }
    };

    verifyFunc();
  }, [success, tableId, url, navigate]); // Include dependencies

  return (
    <div>
      <div className="loader-container">
        <div className="circular-loader"></div>
      </div>
    </div>
  );
};

export default Verify;
