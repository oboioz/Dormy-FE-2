import {
  Autocomplete,
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
import { useAuthContext } from "../../auth/JwtContext";
import { ICreateParkingRequest } from "../../models/responses/ParkingRequestModels";
import { IParkingSpot } from "../../models/responses/ParkingSpotModels";

type Props = {
  vehicle: IVehicle;
};

export default function VehicleDetails({ vehicle }: Props) {
  const { user } = useAuthContext();
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isOpenPRForm, setIsOpenPRForm] = useState<boolean>(false);
  const [parkingSpots, setParkingSpots] = useState<IParkingSpot[]>([]);
  const [parkingSpot, setParkingSpot] = useState<IParkingSpot>();
  const [parkingRequest, setParkingRequest] = useState<ICreateParkingRequest>({
    description: "",
    parkingSpotId: "",
    vehicleId: vehicle.id,
  });

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

  const addVehicleInfo = async (payload: IUpdateVehicle) => {
    var isSuccess = await httpClient.vehicleService.addVehicle(
      payload,
      user?.id || ""
    );
    if (isSuccess) {
      toast.success("Success");
      window.location.reload();
    } else {
      toast.error("Failed, please try again later");
    }
  };

  const getParkingSpots = async () => {
    var response = await httpClient.parkingSpotService.getParkingSpotBatch({
      ids: [],
    });
    setParkingSpots(response);
  };

  const createParkingRequest = async (payload: ICreateParkingRequest) => {
    var isSuccess = await httpClient.parkingRequestService.createParkingRequest(
      { ...payload, vehicleId: vehicle.id }
    );
    if (isSuccess) {
      toast.success("Success");
      window.location.reload();
    } else {
      toast.error("Failed, please try again later");
    }
  };

  const handleSetLicensePlate = (value: string) => {
    setVehicleInfo({ ...vehicleInfo, licensePlate: value });
  };

  const handleSetVehicleType = (value: string) => {
    setVehicleInfo({ ...vehicleInfo, vehicleType: value });
  };

  const handleSetPQDescription = (value: string) => {
    setParkingRequest({ ...parkingRequest, description: value });
  };

  const handleSetPQSpotId = (value: string) => {
    setParkingRequest({ ...parkingRequest, parkingSpotId: value });
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

  const handleOpenPRForm = () => {
    setIsOpenPRForm(true);
  };

  const handleClosePRForm = () => {
    setIsOpenPRForm(false);
    setParkingRequest({
      description: "",
      parkingSpotId: "",
      vehicleId: vehicle.id,
    });
  };

  const handleSubmitParkingRequest = () => {
    createParkingRequest(parkingRequest);
  };

  const handleSubmit = () => {
    if (vehicle.id) {
      updateVehicleInfo(vehicleInfo);
    } else {
      addVehicleInfo(vehicleInfo);
    }
    handleCloseForm();
  };

  useEffect(() => {
    setVehicleInfo({
      id: vehicle.id,
      licensePlate: vehicle.licensePlate,
      vehicleType: vehicle.vehicleType,
    });
  }, [vehicle]);

  useEffect(() => {
    getParkingSpots();
  }, []);

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
            {!vehicle.id ? "Add vehicle" : "Update Vehicle Info"}
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
          {vehicle.parkingSpotId ? (
            <Typography variant="subtitle2">
              {vehicle.parkingSpotName}
            </Typography>
          ) : (
            <Button variant="outlined" onClick={() => handleOpenPRForm()}>
              Create Parking Request
            </Button>
          )}
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
        <DialogTitle>
          {vehicle.id ? "Update Vehicle Info" : "Add Vehicle"}
        </DialogTitle>
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

      <Dialog
        open={isOpenPRForm}
        onClose={handleClosePRForm}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Parking Request</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Description"
              value={parkingRequest.description}
              onChange={(e) => handleSetPQDescription(e.target.value)}
              fullWidth
            />

            <Autocomplete
              options={parkingSpots}
              getOptionLabel={(option) =>
                option.parkingSpotName +
                  " - " +
                  `${option.currentQuantity}/${option.capacitySpots} Spots` ||
                "--"
              }
              value={parkingSpot}
              onChange={(event, newValue) => {
                setParkingSpot(newValue || undefined);
                handleSetPQSpotId(newValue?.id || "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  key={parkingSpot?.id}
                  label="Select Parking Spot"
                />
              )}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePRForm}>Cancel</Button>
          <Button
            disabled={
              !parkingRequest.parkingSpotId || !parkingRequest.description
            }
            variant="contained"
            onClick={() => handleSubmitParkingRequest()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
