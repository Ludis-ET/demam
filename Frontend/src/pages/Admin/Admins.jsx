import { useContext, useState } from "react";
import { AuthContext, DashboardContext } from "../../context";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const Admins = () => {
  const { admins, setAdmins } = useContext(DashboardContext);
  const { myprofile, authTokens } = useContext(AuthContext);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [add, setAdd] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const response = await axios.post(
        `${backendUrl}api/admin/register`,
        newAdmin
      );
      if (response.data.success) {
        setAdmins((prev) => [...prev, response.data.data]);
        toast.success("Admin added successfully!");
        setAdd(false);
        setNewAdmin({ name: "", phoneNumber: "", password: "" });
      } else if (response.status === 400) {
        toast.error("Admin already exists");
      }
    } catch (error) {
      toast.error("Admin already exists or enter a valid input");
    } finally {
      setLoading(false); // Set loading to false after request
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    setLoading(true); // Set loading to true
    try {
      const response = await axios.delete(
        `${backendUrl}api/admin/users/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${authTokens}`,
          },
        }
      );

      if (response.data.success) {
        setAdmins((prev) => prev.filter((admin) => admin._id !== adminId));
        toast.success("Admin deleted successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      toast.error("Failed to delete admin. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Toaster />
      <h1 className="text-3xl font-bold my-8 text-center text-clayBrown">
        Admins
      </h1>
      <div className="max-w-[900px] w-full mx-4 mt-8">
        {admins
          .filter((admin) => admin._id !== myprofile._id)
          .map((admin) => (
            <div
              key={admin._id}
              className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200"
            >
              <div className="flex items-center">
                <img
                  className="rounded-full h-20 w-20"
                  src="https://imgs.search.brave.com/Gh-2D7gzKlftfRyShAHT-8izz4lLQunpy_hE-NpSjfo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS93M2ltYWdlcy9h/dmF0YXI2LnBuZw"
                  alt={`${admin.name}'s avatar`}
                />
                <div className="ml-2 flex flex-col">
                  <div className="leading-snug text-2xl text-gray-900 font-bold">
                    {admin.name}
                  </div>
                  <div className="leading-snug text-xl text-gray-600">
                    {admin.phoneNumber}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteAdmin(admin._id)}
                className="h-8 px-3 text-md font-bold text-red-400 border border-red-400 rounded-full hover:bg-blue-100"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        {!add ? (
          <div
            className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200"
            onClick={() => setAdd(true)}
          >
            <div className="flex items-center">
              <img
                className="rounded-full h-20 w-20"
                src="https://imgs.search.brave.com/Gh-2D7gzKlftfRyShAHT-8izz4lLQunpy_hE-NpSjfo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS93M2ltYWdlcy9h/dmF0YXI2LnBuZw"
                alt="Add admin"
              />
              <div className="ml-2 flex flex-row gap-2">
                <div className="leading-snug text-2xl text-gray-900 font-bold">
                  Add Admin
                </div>
                <div className="fa fa-plus leading-snug text-xl text-gray-600"></div>
              </div>
            </div>
          </div>
        ) : (
          <form className="max-w-sm mx-auto" onSubmit={handleAddAdmin}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Admin Full Name
              </label>
              <input
                type="text"
                name="name"
                value={newAdmin.name}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Abebe Beso"
                required
                disabled={loading}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Admin Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={newAdmin.phoneNumber}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="09--------"
                required
                disabled={loading} 
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Admin Password
              </label>
              <input
                type="password"
                name="password"
                value={newAdmin.password}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                disabled={loading}
              />
            </div>
            <div className="flex items-start mb-5">
              <label
                onClick={() => setAdd(false)}
                className="ms-2 text-sm font-medium text-clayBrown cursor-pointer dark:text-gray-300"
              >
                Cancel adding
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-clayBrown focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              disabled={loading} 
            >
              {loading ? "Adding..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
