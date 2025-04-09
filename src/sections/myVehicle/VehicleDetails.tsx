import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IUpdateVehicle, IVehicle } from "../../models/responses/VehicleModels";
import { fDate } from "../../utils/formatTime";
import { useEffect, useState } from "react";
import { httpClient } from "../../services";
import { toast } from "react-toastify";
import Iconify from "../../components/iconify";

type Props = {
  vehicle: IVehicle;
};

export default function VehicleDetails({ vehicle }: Props) {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [vehicleInfo, setVehicleInfo] = useState<IUpdateVehicle>({
    id: vehicle.id,
    vehicleType: vehicle.vehicleType,
    licensePlate: vehicle.licensePlate,
  });

  const updateVehicleInfo = async (payload: IUpdateVehicle) => {
    var isSuccess = await httpClient.vehicleService.updateVehicle(payload);
    if (isSuccess) {
      toast.success("Update success");
      window.location.reload();
    } else {
      toast.error("Update failed, please try again later");
    }
  };

  const handleSetLicensePlate = (value: string) => {
    setVehicleInfo({ ...vehicleInfo, licensePlate: value });
  };

  const handleSetVehicleType = (value: string) => {
    setVehicleInfo({ ...vehicleInfo, vehicleType: value });
  };

  const handleOpenForm = () => {
    setIsOpenForm(true);
  };

  const handleCloseForm = () => {
    setIsOpenForm(false);
    setVehicleInfo({
      id: vehicle.id,
      licensePlate: vehicle.licensePlate,
      vehicleType: vehicle.vehicleType,
    });
  };

  const handleSubmit = () => {
    updateVehicleInfo(vehicleInfo);
    handleCloseForm();
  };

  useEffect(() => {
    setVehicleInfo({
      id: vehicle.id,
      licensePlate: vehicle.licensePlate,
      vehicleType: vehicle.vehicleType,
    });
  }, [vehicle]);

  return (
    <Card sx={{ p: 3 }}>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography
            variant="overline"
            sx={{ mb: 3, display: "block", color: "text.secondary" }}
          >
            Information
          </Typography>
        </Grid>
        <Grid item>
          <Button
            startIcon={<Iconify icon="eva:edit-fill" />}
            variant="outlined"
            onClick={() => handleOpenForm()}
          >
            Update Vehicle Info
          </Button>
        </Grid>
      </Grid>

      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Vehicle Brand
          </Typography>
          <Typography variant="subtitle2">{vehicle.vehicleType} </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Garage
          </Typography>
          <Typography variant="subtitle2">{vehicle.parkingSpotName}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Registration Date
          </Typography>
          <Typography variant="subtitle2">
            {vehicle.lastUpdatedDateUtc
              ? fDate(new Date(vehicle.lastUpdatedDateUtc))
              : "--/--/--"}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            License Plate
          </Typography>
          <Typography variant="subtitle2">{vehicle.licensePlate}</Typography>
        </Stack>
      </Stack>
      <Dialog
        open={isOpenForm}
        onClose={handleCloseForm}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Update Vehicle Info</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {/* Vehicle Type Field */}
            <TextField
              label="Vehicle Type"
              value={vehicleInfo.vehicleType}
              onChange={(e) => handleSetVehicleType(e.target.value)}
              fullWidth
            />

            {/* License Plate Field */}
            <TextField
              label="License Plate"
              value={vehicleInfo.licensePlate}
              onChange={(e) => handleSetLicensePlate(e.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button
            disabled={!vehicleInfo.licensePlate || !vehicleInfo.vehicleType}
            variant="contained"
            onClick={() => handleSubmit()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
