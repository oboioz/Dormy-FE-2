import { Navigate } from "react-router-dom";
// routes
import { PATH_ADMIN } from "../routes/paths";
// components
import LoadingScreen from "../components/loading-screen";
import { useAuthContext } from "./JwtContext";
import LoginPage from "../pages/auth/LoginPage";
//

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { user } = useAuthContext();

  if (user?.id) {
    return <Navigate to={PATH_ADMIN.dashboard} />;
  }

  return <> {children} </>;
}
