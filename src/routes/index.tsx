import { useRoutes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../layouts/dashboard";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
        },
      ],
    },
  ]);
}
