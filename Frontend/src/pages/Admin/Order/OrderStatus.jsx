import { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import { Card } from "../Card";

export const OrderStatus = () => {
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

  const distinctPhoneNumbers = [
    ...new Set(orders.map((order) => order.phoneNumber)),
  ].length;

  return (
    <div className="container items-center px-4 py-8 m-auto mt-5">
      <div className="flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0">
        <Card
          text={pendingOrders}
          name="Pending Orders"
          className="fa fa-box"
        />
        <Card
          text={deletedOrders}
          name="Deleted Orders"
          className="fa fa-trash"
        />
        <Card
          text={completedOrders}
          name="Completed Orders"
          className="fa fa-check-circle"
        />
        <Card
          text={distinctPhoneNumbers}
          name="Ordered Users"
          className="fa fa-phone"
        />
      </div>
    </div>
  );
};
