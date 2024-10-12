import React, { useState, useContext } from "react";
import {
  useTable,
  useExpanded,
  useFilters,
  useSortBy,
  usePagination,
} from "react-table";
import { AuthContext, DashboardContext } from "../../../context";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";

export const OrderTable = () => {
  const { orders, setOrders } = useContext(DashboardContext);
  const { authTokens } = useContext(AuthContext);
  const [filterInput, setFilterInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loadingOrderId, setLoadingOrderId] = useState(null); // State for tracking loading status
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const columns = React.useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "_id",
        filter: "includes",
      },
      {
        Header: "Customer Name",
        accessor: "customerName",
        filter: "includes",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "Total Price",
        accessor: "totalPrice",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row, value }) => {
          const handleStatusChange = async (e) => {
            const newStatus = e.target.value;
            setLoadingOrderId(row.original._id); // Set loading state

            try {
              await axios.put(
                `${backendUrl}api/orders/${row.original._id}`,
                { status: newStatus },
                {
                  headers: {
                    Authorization: `Bearer ${authTokens}`,
                  },
                }
              );

              const updatedOrders = orders.map((order) =>
                order._id === row.original._id
                  ? { ...order, status: newStatus }
                  : order
              );
              setOrders(updatedOrders);

              toast.success("Order status updated successfully!");
            } catch (error) {
              toast.error("Failed to update order status.");
            } finally {
              setLoadingOrderId(null); // Reset loading state
            }
          };

          return (
            <div className="relative">
              <select
                value={value}
                onChange={handleStatusChange}
                className={`p-2 rounded ${
                  value === "pending"
                    ? "bg-yellow-400 text-black"
                    : value === "completed"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
                disabled={loadingOrderId === row.original._id} // Disable while loading
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="deleted">Canceled</option>
              </select>
              {loadingOrderId === row.original._id && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50">
                  <span className="loader"></span>
                </div>
              )}
            </div>
          );
        },
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }) =>
          formatDistanceToNow(new Date(value), { addSuffix: true }),
      },
    ],
    [orders, setOrders, loadingOrderId]
  );

  const sortedData = React.useMemo(() => {
    return orders.sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return 0;
    });
  }, [orders]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: sortedData,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("customerName", value);
    setFilterInput(value);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value || undefined;
    setStatusFilter(value);
    setFilter("status", value);
  };

  const handleRowClick = (row) => {
    if (row.isExpanded) {
      row.toggleRowExpanded(false);
    } else {
      for (let r of page) {
        if (r.id !== row.id) {
          r.toggleRowExpanded(false);
        }
      }
      row.toggleRowExpanded(true);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="w-full flex justify-between">
        <input
          value={filterInput}
          onChange={handleFilterChange}
          placeholder="Search by customer name..."
          className="p-2 mb-4 border-2 rounded outline-none border-clayBrown"
        />
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="mb-4 border rounded p-2 outline-none bg-clayBrown text-white"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="deleted">Canceled</option>
        </select>
      </div>
      <table
        {...getTableProps()}
        className="min-w-full bg-white rounded-lg shadow-lg"
      >
        <thead className="bg-clayBrown text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="p-2 text-left border-b"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <React.Fragment key={row.id}>
                <tr
                  {...row.getRowProps()}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(row)}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-2 border-b">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={columns.length} className="p-4 bg-gray-50">
                      <div>
                        <h4 className="font-bold">Ordered Products:</h4>
                        <ul className="flex flex-wrap w-full gap-8">
                          {row.original.orderItems.map((item) => (
                            <div key={item.product._id}>
                              <div className="flex gap-4">
                                <img
                                  src={item.product.image1Url}
                                  alt=""
                                  className="w-32"
                                />
                                {item.product.image2Url && (
                                  <img
                                    src={item.product.image2Url}
                                    alt=""
                                    className="w-32"
                                  />
                                )}
                                {item.product.image3Url && (
                                  <img
                                    src={item.product.image3Url}
                                    alt=""
                                    className="w-32"
                                  />
                                )}
                              </div>
                              <li className="flex flex-col gap-2">
                                <a
                                  target="_blank"
                                  href={`/${item.product._id}/detail`}
                                  className="font-bold text-clayBrown text-xl cursor-pointer"
                                >
                                  {item.product.name}{" "}
                                  <i className="fa-solid fa-up-right-from-square"></i>
                                </a>
                                <p>
                                  <b className="text-clayBrown">Quantity: </b>
                                  {item.quantity}
                                </p>
                                <p>
                                  <b className="text-clayBrown">Price: </b>
                                  {item.price} ETB
                                </p>
                              </li>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <div>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="text-clayBrown hover:underline mr-2"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="text-clayBrown hover:underline mr-2"
          >
            {"<"}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="text-clayBrown hover:underline mr-2"
          >
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageOptions.length - 1)}
            disabled={!canNextPage}
            className="text-clayBrown hover:underline"
          >
            {">>"}
          </button>
        </div>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="p-2 border-2 rounded text-clayBrown border-clayBrown outline-none"
        >
          {[5, 10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
