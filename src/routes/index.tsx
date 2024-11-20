import { useRoutes } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";
import LoginPage from "../pages/auth/LoginPage";
import UserProfilePage from "../pages/user/UserProfilePage";

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <LoginPage />
          ),
        },
      ],
    },

    {
      path: 'dashboard',
      element: (
        <DashboardLayout />
      ),
      children: [
        { path: 'user', element: (<UserProfilePage />), },
      ],
    },
  ]);
}
