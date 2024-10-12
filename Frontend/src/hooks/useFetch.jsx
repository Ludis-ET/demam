import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(backendUrl + url);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetch();
    setLoading(false);
  }, []);

  return { data, loading, error };
};
