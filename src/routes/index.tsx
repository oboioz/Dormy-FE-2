import { useRoutes } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";
import LoginPage from "../pages/auth/LoginPage";
import ContractListPage from "../pages/user/ContractListPage";
import RoomDetailsPage from "../pages/user/RoomDetailsPage";
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
      path: 'user',
      element: (
        <DashboardLayout />
      ),
      children: [
        { path: 'profile', element: (<UserProfilePage />), },
        { path: 'contractlist', element: (<ContractListPage />), },
        { path: 'roomdetails', element: (<RoomDetailsPage />), },

      ],
    },
  ]);
}
