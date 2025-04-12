import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../models/enums/DormyEnums";
import { useAuthContext } from "./JwtContext";
import { PATH_ADMIN, PATH_AUTH, PATH_PAGE, PATH_USER } from "../routes/paths";

export const useAuthGuard = (role: UserRole) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const rolePaths = {
      [UserRole.ADMIN]: PATH_USER.profile,
      [UserRole.CUSTOMER]: PATH_ADMIN.dashboard,
      [UserRole.GUEST]: PATH_AUTH.login,
    };

    if (user.role !== role) {
      navigate(rolePaths[role]);
    }
  }, [user, role]);
};
