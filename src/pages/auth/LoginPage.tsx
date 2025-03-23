import { Helmet } from "react-helmet-async";
import Login from "../../sections/auth/Login";
import { useAuthContext } from "../../auth/JwtContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserRole } from "../../models/enums/DormyEnums";
import { PATH_ADMIN, PATH_USER } from "../../routes/paths";

export default function LoginPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === UserRole.ADMIN) {
        navigate(PATH_ADMIN.dashboard);
      } else if (user.role === UserRole.CUSTOMER) {
        navigate(PATH_USER.profile);
      }
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title> Login | Dormy</title>
      </Helmet>

      <Login />
    </>
  );
}
