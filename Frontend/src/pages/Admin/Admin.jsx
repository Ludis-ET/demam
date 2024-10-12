import { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { DashboardContext } from "../../context/DashboardContext";
import { Status } from "./Product/Status";
import { Loader } from "../../utils/Loader";
import { Charts } from "./Product/Charts";
import { ProductTable } from "./Product/ProductTable";
import { OrderStatus } from "./Order/OrderStatus";
import { OrderChart } from "./Order/OrderChart";
import { OrderTable } from "./Order/OrderTable";
import { Admins } from "./Admins";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Admin = () => {
  const { loading } = useContext(DashboardContext);
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full flex flex-col gap-8 py-10 px-4 md:px-20 bg-home">
        <Header />
        <div id="status">
          <InViewSection>
            <Status />
          </InViewSection>
        </div>
        <div id="charts">
          <InViewSection>
            <Charts />
          </InViewSection>
        </div>
        <div id="product-table" className="hidden md:block">
          <InViewSection>
            <ProductTable />
          </InViewSection>
        </div>
        <div id="order-status">
          <InViewSection>
            <OrderStatus />
          </InViewSection>
        </div>
        <div id="order-chart">
          <InViewSection>
            <OrderChart />
          </InViewSection>
        </div>
        <div id="order-table" className="hidden md:block">
          <InViewSection>
            <OrderTable />
          </InViewSection>
        </div>
        <div id="admins">
          <InViewSection>
            <Admins />
          </InViewSection>
        </div>
        <div id="footer">
          <InViewSection>
            <Footer />
          </InViewSection>
        </div>
      </div>
    </>
  );
};

const InViewSection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
