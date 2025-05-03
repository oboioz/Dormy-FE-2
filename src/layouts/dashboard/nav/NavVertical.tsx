import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { Badge, Box, Drawer, Icon, Stack } from "@mui/material";
// hooks
import useResponsive from "../../../hooks/useResponsive";
// config
import { NAV } from "../../../config-global";
// components
import Logo from "../../../components/logo";
import { NavSectionVertical } from "../../../components/nav-section";
import Scrollbar from "../../../components/scrollbar";
//
import { Link as RouterLink } from "react-router-dom";
import { PATH_ADMIN, PATH_USER } from "../../../routes/paths";
import NavAccount from "./NavAccount";
import NavDocs from "./NavDocs";
import NavToggleButton from "./NavToggleButton";
import { useAuthContext } from "../../../auth/JwtContext";
import { UserRole } from "../../../models/enums/DormyEnums";
import { navConfig } from "./config-navigation";
import { NotificationTypeEnum } from "../../../models/enums/NotificationTypeEnum";
import { httpClient } from "../../../services";
import SvgColor from "../../../components/svg-color";
import Iconify from "../../../components/iconify";
// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { pathname } = useLocation();
  const { user } = useAuthContext();
  const isAdmin = user?.role === UserRole.ADMIN;

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        overflowY: "auto",
        maxHeight: { xs: "calc(100vh - 64px)", lg: "100%" },
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100%", // Ensures proper content height
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Logo />

        <Box
          component={RouterLink}
          to={
            user?.role === UserRole.ADMIN
              ? PATH_ADMIN.profile
              : PATH_USER.profile
          }
          sx={{
            textDecoration: "none",
            color: "inherit", // Prevents default link color change
            "&:hover": { opacity: 0.8 }, // Optional: subtle hover effect
          }}
        >
          <NavAccount />
        </Box>
      </Stack>

      <NavSectionVertical data={pageNavConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <NavDocs />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      <NavToggleButton />

      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_DASHBOARD,
              bgcolor: "transparent",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
