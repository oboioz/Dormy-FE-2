import { Helmet } from "react-helmet-async";
import { useState } from "react";
// @mui
import {
  Box,
  Card,
  Container,
  Typography,
  CardHeader,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
// routes
// components
import { useSettingsContext } from "../../components/settings";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
// auth
import RoleBasedGuard from "../../auth/RoleBasedGuard";
import { PATH_ADMIN } from "../../routes/paths";

// ----------------------------------------------------------------------

export default function PermissionDeniedPage() {
  const { themeStretch } = useSettingsContext();

  const [role, setRole] = useState("admin");

  const handleChangeRole = (
    event: React.MouseEvent<HTMLElement>,
    newRole: string | null
  ) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  return (
    <>
      <Helmet>
        <title> Other Cases: Permission Denied | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Permission Denied"
          links={[
            {
              name: "Dashboard",
              href: PATH_ADMIN.dashboard,
            },
            {
              name: "Permission Denied",
            },
          ]}
        />

        <ToggleButtonGroup
          exclusive
          value={role}
          onChange={handleChangeRole}
          color="primary"
          sx={{ mb: 5 }}
        >
          <ToggleButton value="admin" aria-label="admin role">
            isAdmin
          </ToggleButton>

          <ToggleButton value="user" aria-label="user role">
            isUser
          </ToggleButton>
        </ToggleButtonGroup>

        <RoleBasedGuard hasContent roles={[role]}>
          <Box gap={3} display="grid" gridTemplateColumns="repeat(2, 1fr)">
            {[...Array(8)].map((_, index) => (
              <Card key={index}>
                <CardHeader
                  title={`Card ${index + 1}`}
                  subheader="Proin viverra ligula"
                />

                <Typography sx={{ p: 3, color: "text.secondary" }}>
                  Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                  tellus. In enim justo, rhoncus ut, imperdiet a, venenatis
                  vitae, justo. Vestibulum fringilla pede sit amet augue.
                </Typography>
              </Card>
            ))}
          </Box>
        </RoleBasedGuard>
      </Container>
    </>
  );
}
