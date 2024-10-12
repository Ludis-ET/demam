import { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import { Card } from "../Card";

export const Status = () => {
  const { products, orders, admins } = useContext(DashboardContext);
  if (!products || !orders || !admins) {
    return;
  }
  const totalStock = Array.isArray(products)
    ? products.reduce(
        (total, product) => total + (product.stock ? product.stock : 0),
        0
      )
    : 0;
  return (
    <div class="container items-center px-4 py-8 m-auto mt-5">
      <div class="flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0">
        <Card
          text={admins.length}
          name="Registered Admins"
          className="fa fa-user-circle"
        />
        <Card
          text={products.length}
          name="Total Products"
          className="fa fa-shopping-cart"
        />

        <Card
          text={orders.length}
          name="Total Orders"
          className="fa fa-check"
        />
        <Card text={totalStock} name="Stock" className="fa fa-list" />
      </div>
    </div>
  );
};
