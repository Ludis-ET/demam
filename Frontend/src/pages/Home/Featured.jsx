import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import { useFetch } from "../../hooks";

export const Featured = ({ ex }) => {
  const scrollRef = useRef(null);
  const [scrollInterval, setScrollInterval] = useState(null);
  const { data } = useFetch("api/products");

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
console.log(ex)
  const startScrolling = (direction) => {
    const intervalId = setInterval(() => {
      scroll(direction);
    }, 100); // Adjust the interval time as needed
    setScrollInterval(intervalId);
  };

  const stopScrolling = () => {
    clearInterval(scrollInterval);
    setScrollInterval(null);
  };

  return (
    <div className="my-20 pl-12 font-playfair">
      <div className="w-full flex justify-between pr-12">
        <h1 className="text-xl">You might also like this</h1>
        <Link to="/" className="underline cursor-pointer">
          View Store
        </Link>
      </div>
      <div className="relative mt-8 md:ml-20 w-[95%]">
        <button
          onMouseDown={() => startScrolling("left")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className="absolute bottom-[-10px] left-[35%] transform -translate-y-1/2 bg-transparent border border-clayBrown p-4 rounded-full shadow-md z-10"
        >
          &lt;
        </button>
        <button
          onMouseDown={() => startScrolling("right")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className="absolute bottom-[-10px] right-[35%] transform -translate-y-1/2 bg-transparent border border-clayBrown p-4 rounded-full shadow-md z-10"
        >
          &gt;
        </button>
        <div
          ref={scrollRef}
          className="h-[600px] overflow-hidden flex gap-8 scroll-smooth"
        >
          {data &&
            data.map(
              (product, index) =>
                ex !== product._id && (
                  <ProductCard key={index} product={product} id={index} />
                )
            )}
        </div>
      </div>
    </div>
  );
};
