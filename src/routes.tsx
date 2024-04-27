import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AdminLoginPage from "./AdminLoginPage";
import ControlPanelPage from "./ControlPanelPage";
import PricesPage from "./PricesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/prices",
    element: <PricesPage />,
  },
  {
    path: "AdminLogin",
    element: <AdminLoginPage />,
  },
  {
    path: "ControlPanel",
    element: <ControlPanelPage />,
  },
]);

export default router;
