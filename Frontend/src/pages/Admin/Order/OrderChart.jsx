import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { DashboardContext } from "../../../context/DashboardContext";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export const OrderChart = () => {
  const { orders } = useContext(DashboardContext);

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  ).length;
  const deletedOrders = orders.filter(
    (order) => order.status === "deleted"
  ).length;

  const data = {
    labels: ["Pending", "Completed", "Deleted"],
    datasets: [
      {
        label: "Order Status Distribution",
        data: [pendingOrders, completedOrders, deletedOrders],
        backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Order Status Distribution
      </h2>
      <div className="h-72">
        {" "}
        {/* Fixed height for the chart */}
        <Pie
          data={data}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};
