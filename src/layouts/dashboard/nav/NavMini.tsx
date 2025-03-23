// @mui
import { Stack, Box } from "@mui/material";
// config
import { NAV } from "../../../config-global";
// utils
import { hideScrollbarX } from "../../../utils/cssStyles";
// components
import Logo from "../../../components/logo";
import { NavSectionMini } from "../../../components/nav-section";
//
import NavToggleButton from "./NavToggleButton";
import { useAuthContext } from "../../../auth/JwtContext";
import { UserRole } from "../../../models/enums/DormyEnums";
import { navConfig } from "./config-navigation";

// ----------------------------------------------------------------------

export default function NavMini() {
  const { user } = useAuthContext();
  const isAdmin = user?.role === UserRole.ADMIN;
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_DASHBOARD_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: "fixed",
          width: NAV.W_DASHBOARD_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <Logo sx={{ mx: "auto", my: 2 }} />

        <NavSectionMini
          data={isAdmin ? navConfig.adminNavConfig : navConfig.userNavConfig}
        />
      </Stack>
    </Box>
  );
}
