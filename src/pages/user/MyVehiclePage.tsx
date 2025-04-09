import { Container, Grid } from "@mui/material";
import { PATH_USER } from "../../routes/paths";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import { Helmet } from "react-helmet-async";
import { useSettingsContext } from "../../components/settings";
import HistoryPartition from "../../sections/myVehicle/HistoryPartition";
import VehicleDetails from "../../sections/myVehicle/VehicleDetails";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { httpClient } from "../../services";
import { useEffect, useState } from "react";
import {
  IVehicle,
  VehicleHistoryModel,
} from "../../models/responses/VehicleModels";
import { useAuthContext } from "../../auth/JwtContext";

export default function MyVehiclePage() {
  useAuthGuard(UserRole.CUSTOMER);
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const defaultVehicle: IVehicle = {
    createdDateUtc: "",
    id: "",
    parkingSpotId: "",
    createdBy: "",
    createdByCreator: "",
    isDeleted: false,
    lastUpdatedBy: "",
    lastUpdatedByUpdater: "",
    lastUpdatedDateUtc: "",
    licensePlate: "",
    parkingSpotName: "",
    userFullname: "",
    userId: "",
    vehicleType: "",
  };

  const [tableData, setTableData] = useState<IVehicle>(defaultVehicle);
  const [vehicleHistories, setVehicleHistories] = useState<
    VehicleHistoryModel[]
  >([]);

  const fetchVehicles = async () => {
    var request = await httpClient.vehicleService.getVehicleBatch({
      ids: [],
      userId: user?.id,
    });

    if (request.length > 0) {
      setTableData(request[0]);
      fetchVehicleHistories(request[0].id);
    }
  };

  const fetchVehicleHistories = async (vehicleId: string) => {
    var response =
      await httpClient.vehicleService.getVehicleHistoriesByVehicleId(vehicleId);
    setVehicleHistories(response);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <>
      <Helmet>
        <title> My Vehicle</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="My Vehicle"
          links={[
            {
              name: "Dashboard",
              href: PATH_USER.root,
            },
            {
              name: "User",
              href: PATH_USER.profile,
            },
            {
              name: "Vehicle",
              href: PATH_USER.vehicle,
            },
          ]}
        />

        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            {tableData && <VehicleDetails vehicle={tableData} />}
          </Grid>

          <Grid item xs={12} md={4}>
            <HistoryPartition histories={vehicleHistories} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
