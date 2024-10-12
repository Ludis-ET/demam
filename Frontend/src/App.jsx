import { MainRoutes } from "./routes/MainRoutes";
import { AuthProvider, ProductProvider, UtilProvider } from "./context";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AdminRoutes } from "./routes/AdminRoutes";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <UtilProvider>
            <Routes>
              <Route path="/superadmin/*" element={<AdminRoutes />} />
              <Route path="*" element={<MainRoutes />} />
            </Routes>
          </UtilProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}
