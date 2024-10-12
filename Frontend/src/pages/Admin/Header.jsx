import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";

const navItems = [
  { name: "Main Website", href: "/", isExternal: true },
  { name: "Dashboard", href: "#status" },
  { name: "Products", href: "#product-table" },
  { name: "Order Status", href: "#order-status" },
  { name: "Orders", href: "#order-table" },
  { name: "Admins", href: "#admins" },
  { name: "Contact", href: "#footer" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logoutUser } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed top-0 z-[9999] left-0 right-0 p-4 backdrop-blur-md bg-white/30 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <span className="flex gap-2 items-center">
            <Link to="/superadmin" className="text-2xl font-bold text-gray-800">
              Demam Admin Page
            </Link>
            <i
              className="fa fa-power-off p-2 cursor-pointer bg-red-600 text-white rounded-xl"
              onClick={logoutUser}
            ></i>
          </span>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  target={item.isExternal ? "_blank" : "_self"}
                  href={item.href}
                  className={`text-gray-800 hover:text-gray-600 ${
                    item.isExternal
                      ? "rounded-md bg-clayBrown p-4 text-white hover:text-white"
                      : ""
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-[9998] transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />
      <aside
        className={`fixed top-0 left-0 z-[9999] h-full w-64 bg-white p-6 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Menu</h2>
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                target={item.isExternal ? "_blank" : "_self"}
                href={item.href}
                className={`text-gray-800 hover:text-gray-600 ${
                  item.isExternal
                    ? "block text-white rounded-md bg-clayBrown p-4"
                    : ""
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};
