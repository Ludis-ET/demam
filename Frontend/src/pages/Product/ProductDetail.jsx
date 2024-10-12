import { useContext, useState, useEffect } from "react";
import { Featured } from "../Home/Featured";
import { useFetch } from "../../hooks/";
import { useParams } from "react-router-dom";
import { ProductContext, UtilContext } from "../../context";
import { Loader } from "../../utils/Loader";
import f from "../../assets/4.gif"

const ProductDetail = () => {
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const { data, loading, error } = useFetch(`api/products/${id}`);
  const { addToCart, removeFromCart, checkCart, updateQuantity, getCart } =
    useContext(ProductContext);

  const [quantity, setQuantity] = useState(1);
  const { set } = useContext(UtilContext);

  useEffect(() => {
    set([
      { label: "Home", path: "/", type: "route" },
      { label: "Store", path: "/#store", type: "route" },
      { label: "Contact Us", id: "footer", type: "scroll" },
    ]);
  }, [set]);

  useEffect(() => {
    if (data) {
      const cartItem = getCart(data);
      if (cartItem) {
        setQuantity(cartItem.quantity);
      }
      setImage(data.image1Url);
    }
  }, [data]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);

    if (getCart(data)) {
      updateQuantity(data._id, newQuantity);
    } else {
      addToCart(data, newQuantity);
    }
  };
if (error) {
  return (
    <div className="w-full flex justify-center items-center h-[70vh]">
      <img src={f} className="w-96" alt="" />
    </div>
  );
}
  if (!data || loading) {
    return <Loader />;
  }


  return (
    <>
      {data && !loading && (
        <div className="my-8 mx-4 lg:mx-20 flex flex-col lg:flex-row justify-around gap-12">
          <div className="flex gap-2 flex-col-reverse lg:flex-row">
            <div className="flex lg:flex-col max-h-screen overflow-x-scroll lg:overflow-hidden p-4 flex-row gap-4">
              {data.image1Url && (
                <img
                  className={`flex-shrink-0 w-40 lg:w-80 lg:h-40 p-2 cursor-pointer ${
                    image === data.image1Url && "border-4 border-clayBrown"
                  }`}
                  onClick={() => setImage(data.image1Url)}
                  src={data.image1Url}
                />
              )}
              {data.image2Url && (
                <img
                  className={`flex-shrink-0 w-40 lg:w-80 lg:h-40 p-2 cursor-pointer ${
                    image === data.image2Url && "border-4 border-clayBrown"
                  }`}
                  onClick={() => setImage(data.image2Url)}
                  src={data.image2Url}
                />
              )}
              {data.image3Url && (
                <img
                  className={`flex-shrink-0 w-40 lg:w-80 lg:h-40 p-2 cursor-pointer ${
                    image === data.image3Url && "border-4 border-clayBrown"
                  }`}
                  onClick={() => setImage(data.image3Url)}
                  src={data.image3Url}
                />
              )}
            </div>
            <div>
              <img
                src={image}
                alt=""
                className=" flex-shrink-0 w-[1000px] h-[600px]"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 font-playfair">
            <header className="text-4xl font-bold text-clayBrown">
              {data.name}
            </header>
            <ul className="flex gap-4 text-gray-500 cursor-pointer">
              <li>{data.category}</li>
            </ul>
            <p className="text-xl ml-4 w-[80%]">{data.description}</p>
            <b className="text-xl lg:text-4xl text-clayBrown">
              ETB{data.price}
            </b>
            <div className="flex flex-wrap gap-12">
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={handleQuantityChange}
                className="border-2 border-clayBrown p-4  text-clayBrown outline-none text-xl transition-colors duration-2000 "
              />
              {checkCart(data) ? (
                <button
                  onClick={() => removeFromCart(data)}
                  className="border-2 border-clayBrown p-4 text-black hover:bg-clayBrown bg-transparent text-xl transition-colors duration-2000 hover:text-white"
                >
                  Remove From Cart
                </button>
              ) : (
                <button
                  onClick={() => addToCart(data, quantity)}
                  className="border-2 hover:border-clayBrown p-4 hover:text-black bg-clayBrown hover:bg-transparent text-xl transition-colors duration-2000 text-white"
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {data && <Featured ex={data._id} />}
    </>
  );
};

export default ProductDetail;
