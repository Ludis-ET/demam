import { useContext } from "react";
import { UtilContext } from "../context";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { links } = useContext(UtilContext);

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      id="footer"
      className="w-full flex flex-col py-10 border-t-2 border-clayBrown"
    >
      <div className="flex flex-wrap gap-8 justify-around px-12">
        <div className="w-42 flex flex-col gap-4">
          <p className="w-64">
            Join Our Newsletter! Be the first to know about exclusive offers,
            new products, and beauty tips.
          </p>
          <input
            type="email"
            placeholder="Type your email"
            className="border-2 border-clayBrown p-2 w-42 text-clayBrown text-xl"
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Links</h1>
          <ul className="text-xl underline cursor-pointer">
            {links.map((link) => (
              <li key={link.label}>
                {link.type === "scroll" ? (
                  <span onClick={() => handleScroll(link.id)}>
                    {link.label}
                  </span>
                ) : (
                  <Link to={link.path}>{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xl text-center">
          <p>Let's Follow Together</p>
          <div className="flex gap-4 m-4 justify-center text-clayBrown">
            <a className="cursor-pointer fa fa-phone"></a>
            <a className="cursor-pointer fa fa-envelope"></a>
            <a className="cursor-pointer fab fa-facebook-f"></a>
            <a className="cursor-pointer fab fa-telegram"></a>
            <a className="cursor-pointer fab fa-instagram"></a>
            <a className="cursor-pointer fab fa-twitter"></a>
          </div>
        </div>
      </div>
      <div className="w-full text-[#4a4a4a] flex flex-col justify-center items-center my-8">
        <h1 className="text-3xl font-playfair">Demam Product</h1>
        <p>© 2022 Demam Products. All rights reserved.</p>
      </div>
    </div>
  );
};
