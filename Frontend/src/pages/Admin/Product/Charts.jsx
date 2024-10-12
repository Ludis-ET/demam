import { useContext } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { DashboardContext } from "../../../context/DashboardContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export const Charts = () => {
  const { products, orders } = useContext(DashboardContext);

  const categoryData = products.reduce((acc, product) => {
    const category = product.category;
    const stock = product.stock;

    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += stock;

    return acc;
  }, {});

  const categoryLabels = Object.keys(categoryData);
  const categoryStock = Object.values(categoryData);

  const productData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Stock by Category",
        data: categoryStock,
        backgroundColor: "#8B4513",
      },
    ],
  };

  const orderDataMap = {};

  // Sort orders by createdAt date before processing
  const sortedOrders = orders
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  sortedOrders.forEach((order) => {
    const date = new Date(order.createdAt);
    if (!isNaN(date.getTime())) {
      const formattedDate = date.toLocaleDateString();
      if (!orderDataMap[formattedDate]) {
        orderDataMap[formattedDate] = 0;
      }
      orderDataMap[formattedDate]++;
    }
  });

  const orderDates = Object.keys(orderDataMap);
  const orderCounts = Object.values(orderDataMap);

  const orderData = {
    labels: orderDates,
    datasets: [
      {
        label: "Orders Over Time",
        data: orderCounts,
        fill: false,
        backgroundColor: "#8B4513",
        borderColor: "#8B4513",
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Product and Order Charts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow-md h-80">
          <h3 className="text-lg font-semibold mb-2">Stock by Category</h3>
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            <Bar
              data={productData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
              height={400}
            />
          )}
        </div>

        <div className="bg-white p-4 rounded shadow-md h-80">
          <h3 className="text-lg font-semibold mb-2">Orders Over Time</h3>
          {orders.length === 0 ? (
            <p>No orders available</p>
          ) : (
            <Line
              data={orderData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
              height={400}
            />
          )}
        </div>
      </div>
    </div>
  );
};
