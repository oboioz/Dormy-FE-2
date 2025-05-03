import { memo, useEffect, useState } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { AppBar, Badge, Box, BoxProps, Toolbar } from "@mui/material";
// config
import { HEADER } from "../../../config-global";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// components
import { NavSectionHorizontal } from "../../../components/nav-section";
import { useAuthContext } from "../../../auth/JwtContext";
import { UserRole } from "../../../models/enums/DormyEnums";
import { navConfig } from "./config-navigation";
import { httpClient } from "../../../services";
import { NotificationTypeEnum } from "../../../models/enums/NotificationTypeEnum";
import Iconify from "../../../components/iconify";
//

// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme();
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
    <AppBar
      component="nav"
      color="transparent"
      sx={{
        boxShadow: 0,
        top: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <NavSectionHorizontal data={pageNavConfig} />
      </Toolbar>

      <Shadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        width: 1,
        m: "auto",
        borderRadius: "50%",
        position: "absolute",
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
