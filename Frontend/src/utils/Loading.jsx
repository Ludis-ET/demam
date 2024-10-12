import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

NProgress.configure({
  showSpinner: false,
  speed: 500,
  minimum: 0.1,
  easing: "ease",
  trickleSpeed: 200,
});

const LoadingProgress = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        NProgress.done();
      }, 500); 
    };

    handleRouteChangeComplete();

    return () => {
      NProgress.done();
    };
  }, [location]);

  return null;
};

export default LoadingProgress;
