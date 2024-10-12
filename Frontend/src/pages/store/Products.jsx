import Select from "react-select";
import { ProductCard } from "../Home/ProductCard";
import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { Loader } from "../../utils/Loader";
import no from "../../assets/no.gif";

export const Products = () => {
  const { data, loading } = useFetch("api/products");
  const [options, setOptions] = useState([{ value: "all", label: "All" }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(options[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 20;

  useEffect(() => {
    if (data) {
      const categories = [...new Set(data.map((product) => product.category))];
      const categoryOptions = categories.map((category) => ({
        value: category,
        label: category.charAt(0).toUpperCase() + category.slice(1),
      }));
      setOptions([{ value: "all", label: "All" }, ...categoryOptions]);
    }
  }, [data]);

  const filteredProducts = (data || []).filter((product) => {
    const matchesCategory =
      selectedCategory.value === "all" ||
      product.category === selectedCategory.value;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <a
          key={i}
          href="#"
          onClick={() => setCurrentPage(i)}
          className={`px-6 py-2 border border-[#A0522D] transition-colors duration-200 ${
            currentPage === i
              ? "bg-[#A0522D] text-white"
              : "bg-home text-[#2E8B57]"
          }`}
        >
          {i}
        </a>
      );
    }
    return buttons;
  };

  if (loading || !data) {
    return <Loader />;
  }

  return (
    <div className="my-8 font-playfair">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl">Our Products</h1>
        <Select
          options={options}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              borderColor: "#A0522D",
              padding: "10px",
              textAlign: "center",
              outline: "none",
              width: "150px",
            }),
            option: (provided, { isFocused }) => ({
              ...provided,
              backgroundColor: isFocused ? "#E6CCB2" : "#f4efe9",
              color: "#000",
              width: "auto",
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#000",
            }),
          }}
          defaultValue={options[0]}
          isSearchable={false}
          onChange={setSelectedCategory}
        />
      </div>
      <input
        type="text"
        placeholder="Search products..."
        className="border border-[#A0522D] p-2 my-4 w-full outline-none"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="m-4 flex flex-wrap gap-12 items-center justify-center">
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p className="text-2xl flex w-full items-center flex-col">
            <img src={no} className="w-60" alt="" />
            No products found
          </p>
        )}
      </div>
      {/* <div className="flex items-center justify-center my-12">
        <nav className="inline-flex shadow-md">
          <a
            href="#"
            onClick={handlePreviousPage}
            className={`px-6 py-2 border border-[#A0522D] transition-colors duration-200 ${
              currentPage === 1
                ? "cursor-not-allowed"
                : "bg-[#A0522D] text-white"
            }`}
          >
            Previous
          </a>
          {renderPaginationButtons()}
          <a
            href="#"
            onClick={handleNextPage}
            className={`px-6 py-2 border border-[#A0522D] transition-colors duration-200 ${
              currentPage === totalPages
                ? "cursor-not-allowed"
                : "bg-[#A0522D] text-white"
            }`}
          >
            Next
          </a>
        </nav>
      </div> */}
    </div>
  );
};
