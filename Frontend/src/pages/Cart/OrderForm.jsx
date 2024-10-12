import { useState, useContext, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ProductContext } from "../../context";
import toast from "react-hot-toast";

export const OrderForm = ({ order, setOrder, total }) => {
  const { cart, placeOrder } = useContext(ProductContext);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load saved name and phone number from local storage when the component mounts
  useEffect(() => {
    const savedName = localStorage.getItem("customerName");
    const savedPhoneNumber = localStorage.getItem("phoneNumber");

    if (savedName) {
      setCustomerName(savedName);
    }
    if (savedPhoneNumber) {
      setPhoneNumber(savedPhoneNumber);
    }
  }, []);

  // Save name and phone number to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("customerName", customerName);
    localStorage.setItem("phoneNumber", phoneNumber);
  }, [customerName, phoneNumber]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const orderDetails = {
      customerName,
      phoneNumber,
      orderItems: cart.map((product) => ({
        product: product._id,
        quantity: product.quantity,
        price: product.price,
      })),
      totalPrice: total,
    };

    const toastId = toast.loading("Placing your order...");
    try {
      await placeOrder(orderDetails);
      toast.success("Order placed successfully!", { id: toastId });
      setOrder(false);
    } catch (err) {
      toast.error("Failed to place order", { id: toastId });
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleOrderSubmit}
      className={`bg-white m-3 transition-transform duration-300 ease-in-out absolute bottom-0 z-100 ${
        !order ? "translate-y-full" : "translate-y-0"
      } w-[95%] rounded-md`}
    >
      <header className="text-center m-4 text-2xl flex justify-between items-center font-bold text-clayBrown">
        <span></span> Place Order
        <button
          type="button"
          onClick={() => setOrder(false)}
          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
        >
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Close panel</span>
          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
        </button>
      </header>
      <div className="flex flex-col gap-2 mx-4">
        <label className="text-clayBrown">Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="outline-none border border-clayBrown w-full p-2 rounded-md"
          placeholder="Full Name"
        />
        <label className="text-clayBrown">Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="outline-none border border-clayBrown w-full p-2 rounded-md"
          placeholder="+251 --- -- -- --"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="flex m-7 items-center justify-center rounded-md border border-transparent bg-clayBrown px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#492c18]"
      >
        {loading ? "Placing Order..." : "Order"}
      </button>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
};
