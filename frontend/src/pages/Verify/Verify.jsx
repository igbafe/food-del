import React, { useContext, useEffect, useState } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, token: contextToken } = useContext(StoreContext);
  const [token, setToken] = useState(contextToken);
  const navigate = useNavigate();

  useEffect(() => {
    // If token is not in context, try to get it from localStorage
    if (!token) {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
      } else {
        navigate("/");
      }
    }
  }, [token, navigate]);

  const verifyPayment = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${url}/api/order/verify`,
        {
          success,
          orderId,
        },
        {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success("Order placed successfully!");
        navigate("/myorders");
      } else {
        toast.error("Order verification failed. Please try again.");
        navigate("/");
      }
    } catch (error) {
      console.error("Verification error:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    if (token) {
      verifyPayment();
    }
  }, [token]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
