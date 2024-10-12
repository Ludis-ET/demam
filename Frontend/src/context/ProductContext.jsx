import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [orderComplete, setOrderComplete] = useState(false);

  const [saved, setSaved] = useState(() => {
    const savedItems = localStorage.getItem("saved");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const addToCart = (product, q = 1) => {
    setOrderComplete(false);
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );
    if (existingProductIndex === -1) {
      const newCart = [...cart, { ...product, quantity: q }];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      toast.success(`${product.name} added to cart!`);
    } else {
      const newCart = cart.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      toast.success(`Increased quantity of ${product.name}!`);
    }
  };

  const addToSave = (product) => {
    const newSaved = [...saved, product];
    setSaved(newSaved);
    localStorage.setItem("saved", JSON.stringify(newSaved));
    toast.success(`${product.name} added to saved!`);
  };

  const removeFromSave = (product) => {
    const newSaved = saved.filter((item) => item._id !== product._id);
    setSaved(newSaved);
    localStorage.setItem("saved", JSON.stringify(newSaved));
    toast.success(`${product.name} removed from saved!`);
  };

  const removeFromCart = (product) => {
    const newCart = cart.filter((item) => item._id !== product._id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success(`${product.name} removed from cart!`);
  };

  const checkCart = (product) => cart.some((item) => item._id === product._id);

  const getCart = (product) =>
    cart.find((item) => item._id === product._id) || null;

  const checkSave = (product) => saved.some((item) => item._id === product._id);

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const placeOrder = async (orderDetails) => {
    try {
      const response = await axios.post(
        `${backendUrl}api/orders`,
        orderDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to place order");
      }

      toast.success("Order placed successfully!");
      setCart([]);
      setOrderComplete(true);
      localStorage.removeItem("cart");
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
      throw err;
    }
  };

  const value = {
    cart,
    orderComplete,
    addToCart,
    checkCart,
    removeFromCart,
    updateQuantity,
    saved,
    addToSave,
    removeFromSave,
    checkSave,
    getCart,
    placeOrder,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
