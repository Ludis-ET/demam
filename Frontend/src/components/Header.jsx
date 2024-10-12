import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ProductContext, UtilContext } from "../context";
import { Cart } from "../pages";

export const Header = () => {
  const [side, setSide] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useContext(ProductContext);
  const [open, setOpen] = useState(false);
  const { links } = useContext(UtilContext);

  const toggleScrollState = () => setIsScrolled(window.scrollY > 300);

  useEffect(() => {
    window.addEventListener("scroll", toggleScrollState);
    return () => window.removeEventListener("scroll", toggleScrollState);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element && element.scrollIntoView({ behavior: "smooth" });
    setSide(false);
  };

  const renderCartIcon = () => (
    <div className="flex items-center justify-center">
      <span className="bg-white px-2 flex justify-center items-center text-xl border-clayBrown border-y-2 border-l-2">
        {cart.length}
      </span>
      <i
        onClick={() => setOpen(true)}
        className="fa fa-shopping-bag cursor-pointer px-2 text-xl border-clayBrown border-y-2 border-r-2"
      ></i>
    </div>
  );

  return (
    <div className="font-playfair fixed z-[999] bg-home w-full p-4 border-b border-gray-500">
      <div
        className={`w-full text-[#4a4a4a] flex flex-wrap items-center justify-between ${
          isScrolled && "md:hidden"
        }`}
      >
        <i
          className="fa-solid md:hidden fa-bars cursor-pointer"
          onClick={() => setSide(true)}
        ></i>
        <span className="hidden md:block"></span>
        <Link to="/" className="text-3xl font-extrabold cursor-pointer">
          Demam Products
        </Link>
        {renderCartIcon()}
      </div>

      <div
        className={`w-full hidden md:flex text-xl justify-center gap-12 mt-4 cursor-pointer ${
          isScrolled
            ? "fixed top-0 bg-home p-4 left-0 z-50 border-b mt-0 border-gray-500"
            : ""
        }`}
      >
        {links.map((link) =>
          link.type === "scroll" ? (
            <span key={link.id} onClick={() => scrollToSection(link.id)}>
              {link.label}
            </span>
          ) : (
            <Link key={link.path} to={link.path}>
              {link.label}
            </Link>
          )
        )}
        {isScrolled && (
          <div className="absolute right-20">{renderCartIcon()}</div>
        )}
      </div>

      <AnimatePresence>
        {side && (
          <motion.div
            className="w-full h-full text-2xl fixed bg-sandyBeige top-0 left-0 z-[9999] flex flex-col justify-center items-center p-4"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src="https://i.pinimg.com/564x/04/25/4f/04254f1eb2a4cb2097e54d582806743c.jpg"
              alt="Sidebar Image"
              className="w-48 mb-8 transform"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1 }}
            />
            {links.map((link) =>
              link.type === "scroll" ? (
                <motion.span
                  key={link.id}
                  whileHover={{ scale: 1.1, color: "#f97316" }}
                  className="mb-4 cursor-pointer hover:underline"
                  onClick={() => scrollToSection(link.id)}
                >
                  {link.label}
                </motion.span>
              ) : (
                <motion.span
                  key={link.path}
                  whileHover={{ scale: 1.1, color: "#f97316" }}
                  className="mb-4 cursor-pointer hover:underline"
                >
                  <Link to={link.path}>{link.label}</Link>
                </motion.span>
              )
            )}
            <motion.i
              className="fa-regular fa-circle-xmark absolute top-10 right-10 text-3xl cursor-pointer"
              whileHover={{ scale: 1.3, color: "#dc2626" }}
              onClick={() => setSide(false)}
            ></motion.i>
          </motion.div>
        )}
      </AnimatePresence>

      <Cart open={open} setOpen={setOpen} />
    </div>
  );
};
