import { useState } from "react";
// @mui
import { Box, Card, Container, Tab, Tabs } from "@mui/material";

// components
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Iconify from "../../components/iconify";
// sections
import { Helmet } from "react-helmet-async";
import { useSettingsContext } from "../../components/settings";
import AccountChangePassword from "../../sections/@dashboard/user/account/AccountChangePassword";
import { Profile, ProfileCover } from "../../sections/@dashboard/user/profile";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";

// ----------------------------------------------------------------------

export default function UserProfilePage() {
  useAuthGuard(UserRole.CUSTOMER);
  const { themeStretch } = useSettingsContext();
  const [currentTab, setCurrentTab] = useState("profile");

  const TABS = [
    {
      value: "profile",
      label: "Profile",
      icon: <Iconify icon="ic:round-account-box" />,
      component: <Profile />,
    },
    {
      value: "change_password",
      label: "Change password",
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <>
      <Helmet>
        <title> User: Profile</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Profile"
          links={[{ name: "Dashboard" }, { name: "User" }, { name: "Name" }]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <ProfileCover />

          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: "absolute",
              bgcolor: "background.paper",
              "& .MuiTabs-flexContainer": {
                pr: { md: 3 },
                justifyContent: {
                  sm: "center",
                  md: "flex-end",
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </Tabs>
        </Card>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value}> {tab.component} </Box>
            )
        )}
      </Container>
    </>
  );
}
