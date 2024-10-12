import { useState } from "react";
import axios from "axios";

export const usePlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const placeOrder = async (orderDetails) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`${backendUrl}api/orders`, orderDetails);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { placeOrder, loading, error, success };
};
