import { Link as RouterLink } from "react-router-dom";
// @mui
import { Button, Card, Container } from "@mui/material";
// components
import { Helmet } from "react-helmet-async";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Iconify from "../../components/iconify";
import { useSettingsContext } from "../../components/settings";
import { PATH_ADMIN } from "../../routes/paths";
import BuildingStructure from "../../sections/@dashboard/admin/venue/BuildingStructure";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
// sections

// ----------------------------------------------------------------------

const _buildingList = [...Array(10)].map((_, index) => ({
  buildingID: index + 1,
  name: `Building ${index + 1}`,
  floorNumber: Math.floor(Math.random() * 10) + 1, // Random floor number between 1-10
  genderRestriction: index % 2 === 0 ? "male" : "female", // Alternating male and female
  roomID: index + 100, // Simulating foreign key reference
}));

// ----------------------------------------------------------------------

export default function DormitoryBuildingPage() {
  useAuthGuard(UserRole.ADMIN);
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Dormitory Building Structure</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Dormitory Structure"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Dormitory Structure" },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_ADMIN.dormitory.blockForm}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add new block
            </Button>
          }
        />

        <Card>
          <BuildingStructure buildings={_buildingList} />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
