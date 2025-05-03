// @mui
import { Stack, Box, Badge } from "@mui/material";
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
import { useEffect, useState } from "react";
import { NotificationTypeEnum } from "../../../models/enums/NotificationTypeEnum";
import { httpClient } from "../../../services";
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

export default function NavMini() {
  const { user } = useAuthContext();
  const isAdmin = user?.role === UserRole.ADMIN;
  const [pageNavConfig, setPageNavConfig] = useState(
    isAdmin ? navConfig.adminNavConfig : navConfig.userNavConfig
  );

  const fetchNotifications = async () => {
    var notifications = await httpClient.notificationService.getNotifications();

    if (notifications.length >= 0) {
      console.log("notifications", notifications);
      if (!isAdmin) {
        notifications = notifications.filter((x) =>
          [
            NotificationTypeEnum.CONTRACT_ACTIVATION.toString(),
            NotificationTypeEnum.VIOLATION_CREATION.toString(),
            NotificationTypeEnum.REQUEST_STATUS_CHANGE.toString(),
            NotificationTypeEnum.PARKING_REQUEST_STATUS_CHANGE.toString(),
          ].includes(x.notificationType)
        );
      }

      const hasNewCount = notifications.filter(
        (notification) => !notification.isRead
      );

      if (hasNewCount.length > 0) {
        var newConfig = [...pageNavConfig];
        newConfig = newConfig.map((item) => {
          item.items = item.items.map((subItem) =>
            subItem.title.toLowerCase() === "notification"
              ? {
                  ...subItem,
                  icon: (
                    <Badge
                      badgeContent={hasNewCount.length}
                      color="error"
                      sx={{ width: 1, height: 1 }}
                    >
                      <Iconify
                        icon="eva:bell-fill"
                        sx={{ width: 1, height: 1, color: "text.primary" }}
                      />
                    </Badge>
                  ),
                }
              : subItem
          );
          return item;
        });
        setPageNavConfig(newConfig);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

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

        <NavSectionMini data={pageNavConfig} />
      </Stack>
    </Box>
  );
}
