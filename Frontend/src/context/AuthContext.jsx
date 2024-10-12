import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [myprofile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authTokens && user) {
      const id = user._id;
      const getProfile = async () => {
        setLoading(true);
        try {
          const token = authTokens;
          const response = await axios.get(`${backendUrl}api/admin/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProfile(response.data.data);
        } catch (error) {
          toast.error("Error fetching profile data");
          logoutUser();
        } finally {
          setLoading(false);
        }
      };
      getProfile();
    }
  }, [authTokens, user]);

  let loginUser = async (ph, pass) => {
    try {
      setLoading(true);
      let response = await axios.post(
        `${backendUrl}api/admin/login`,
        {
          phoneNumber: ph,
          password: pass,
        },
        { timeout: 20000 }
      );
      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data.token);
        setUser(data.data);
        localStorage.setItem("authTokens", JSON.stringify(data.token));
        toast.success("Logged in successfully");
        navigate("/superadmin");
      } else {
        toast.error("invalid credentials");
      }
    } catch (error) {
        toast.error("invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  let logoutUser = () => {
    setLoading(true);
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    toast.success("Logged out successfully");
    setLoading(false);
    navigate("/");
  };

  const value = {
    user,
    loginUser,
    logoutUser,
    myprofile,
    authTokens,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
