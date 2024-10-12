import { Suspense, useState, useEffect, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingProgress from "../utils/Loading";
import { Header, Footer } from "../components";

const Home = lazy(() => import("../pages/Home/Home"));
const Store = lazy(() => import("../pages/store/Store"));
const ProductDetail = lazy(() => import("../pages/Product/ProductDetail"));

export const MainRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    const calculateLoadingPercent = () => {
      const resources = performance.getEntriesByType("resource");
      if (resources && resources.length > 0) {
        const totalResources = resources.length;
        const loadedResources = resources.filter(
          (resource) => resource.responseEnd > 0
        ).length;

        if (totalResources > 0) {
          setLoadingPercent(
            Math.floor((loadedResources / totalResources) * 100)
          );
        }
      } else {
        setLoadingPercent(100);
      }
    };

    setIsLoading(true);
    setLoadingPercent(0);
    window.addEventListener("load", handleLoad);
    window.addEventListener("load", calculateLoadingPercent);

    const interval = setInterval(calculateLoadingPercent, 100);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("load", calculateLoadingPercent);
      clearInterval(interval);
    };
  }, [location.pathname]);

  return (
    <div className="bg-home min-h-screen max-w-full overflow-x-hidden">
      {loadingPercent <= 99 ? (
        <LoadingProgress loadingPercent={loadingPercent} />
      ) : (
        <Suspense
          fallback={<LoadingProgress loadingPercent={loadingPercent} />}
        >
          <Header />
          <div className="mt-32">
            <Routes key={location.key}>
              <Route path="/" element={<Home />} />
              <Route path="/:id/detail" element={<ProductDetail />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </Suspense>
      )}
    </div>
  );
};
