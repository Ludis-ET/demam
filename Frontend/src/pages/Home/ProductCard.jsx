import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context";



export const ProductCard = ({ product }) => {
  const {
    addToCart,
    checkCart,
    removeFromCart,
    addToSave,
    removeFromSave,
    checkSave,
  } = useContext(ProductContext);

  return (
    <div className="relative font-playfai w-[300px] h-[500px] flex-shrink-0">
      <Link to={`/${product._id}/detail`}>
        {" "}
        <img src={product.image1Url} className="w-[300px] h-[400px]" alt="" />
      </Link>

      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl">{product.name}</h2>
        <span className="flex justify-between w-full">
          <p className="text-xl">{product.price} ETB</p>
          <p>{product.category}</p>
        </span>
        {checkCart(product) ? (
          <button
            onClick={() => removeFromCart(product)}
            className="border-2 border-clayBrown p-1 w-full hover:bg-transparent hover:text-black bg-clayBrown text-xl transition-colors duration-2000 text-white"
          >
            Remove from cart
          </button>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="border-2 border-clayBrown p-1 w-full text-black hover:bg-clayBrown text-xl transition-colors duration-2000 hover:text-white"
          >
            Add to cart
          </button>
        )}
        {/* <div className="absolute top-4 right-4">
          <button
            onClick={() =>
              checkSave(product) ? removeFromSave(product) : addToSave(product)
            }
            className="relative p-3 rounded-full bg-dark-green text-white hover:bg-light-green transition-colors duration-300"
          >
            <i
              className={`fa-solid fa-bookmark text-xl ${
                checkSave(product) && "text-clayBrown"
              }`}
            ></i>
            <span className="absolute inset-0 bg-dark-green opacity-40 rounded-full"></span>
          </button>
        </div> */}
      </div>
    </div>
  );
};
