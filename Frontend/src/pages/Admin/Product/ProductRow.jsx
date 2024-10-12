import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { FaLink } from "react-icons/fa";

export const ProductRow = ({ product, handleUpdate, handleDelete }) => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    ...product,
    image1Url: product.image1Url,
    image2Url: product.image2Url,
    image3Url: product.image3Url,
  });

  const [imageUrls, setImageUrls] = useState([
    editedProduct.image1Url || "",
    editedProduct.image2Url || "",
    editedProduct.image3Url || "",
  ]);

  const [openModal, setOpenModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUrlChange = (index, value) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = value;
    setImageUrls(updatedUrls);
  };

  const handleSaveClick = async () => {
    try {
      const updatedProduct = { ...editedProduct };
      updatedProduct.image1Url = imageUrls[0];
      updatedProduct.image2Url = imageUrls[1];
      updatedProduct.image3Url = imageUrls[2];

      const response = await axios.put(
        `${backendUrl}api/products/${product._id}`,
        updatedProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      handleUpdate(response.data.product);
    } catch (error) {
      toast.error("Error updating product. Please try again.");
      console.error("Error updating product:", error);
    }
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setOpenModal(true);
  };

  const confirmDelete = async () => {
    setOpenModal(false);
    try {
      await handleDelete(product._id);
    } catch (error) {
      toast.error("Error deleting product. Please try again.");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <tr>
        <td className="p-4 border-b flex justify-center border-slate-200">
          {isEditing ? (
            <div className="flex items-center gap-1 p-0">
              {imageUrls.map((url, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    placeholder={`Image URL ${index + 1}`}
                    className="border rounded p-1 w-40 outline-none"
                  />
                  {url && (
                    <img
                      src={url}
                      alt={`Image URL ${index + 1}`}
                      className="w-20 h-20 mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              {product.image1Url && (
                <img
                  src={product.image1Url}
                  alt="Image 1"
                  className="w-32 h-32 rounded-xl"
                />
              )}
            </>
          )}
        </td>
        {isEditing ? (
          <>
            <td className="p-4 border-b border-slate-200">
              <input
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
              />
            </td>
            <td className="p-4 border-b border-slate-200">
              <input
                type="number"
                min={0}
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
              />
            </td>
            <td className="p-4 border-b border-slate-200">
              <input
                name="category"
                value={editedProduct.category}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
              />
            </td>
            <td className="p-4 border-b border-slate-200">
              <input
                type="number"
                min={1}
                name="stock"
                value={editedProduct.stock}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
              />
            </td>
            <td className="p-4 border-b border-slate-200 ">
              <button
                className="p-2 mr-2 rounded-md text-white hover:bg-clayBrown bg-clayBrown"
                onClick={handleSaveClick}
              >
                <i className="fa fa-save"></i> Save
              </button>
              <button
                className="fa fa-times p-2 mr-2 rounded-md text-white hover:bg-red-700 bg-red-500"
                onClick={() => setIsEditing(false)}
              ></button>
            </td>
          </>
        ) : (
          <>
            <td className="p-4 border-b border-slate-200 ">
              <a
                target="_blank"
                href={`/${product._id}/detail`}
                className="font-bold cursor-pointer text-clayBrown flex gap-2"
              >
                {product.name}
                <FaLink />
              </a>
            </td>
            <td className="p-4 border-b border-slate-200">{product.price}</td>
            <td className="p-4 border-b border-slate-200">
              {product.category}
            </td>
            <td className="p-4 border-b border-slate-200">{product.stock}</td>
            <td className="p-4 border-b border-slate-200 ">
              <button
                className="fa fa-edit p-2 mr-2 rounded-md text-white hover:bg-green-700 bg-green-500"
                onClick={() => setIsEditing(true)}
              ></button>
              <button
                className="fa fa-trash p-2 ml-2 rounded-md text-white hover:bg-red-700 bg-red-500"
                onClick={handleDeleteClick}
              ></button>
            </td>
          </>
        )}
      </tr>
      {isEditing && (
        <tr key={product._id}>
          <td className="text-center text-xl text-clayBrown">
            Product Description
          </td>
          <td colSpan={4}>
            <textarea
              name="description"
              value={editedProduct.description || ""}
              onChange={handleInputChange}
              className="outline-none border border-clayBrown w-full p-2"
            />
          </td>
        </tr>
      )}

      {/* Confirmation Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Confirm Deletion
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this product? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
