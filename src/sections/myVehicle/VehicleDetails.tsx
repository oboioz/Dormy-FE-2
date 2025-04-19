import {
  Autocomplete,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
  const [openDeleteVehicle, setOpenDeleteVehicle] = useState<boolean>(false);
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

  const handleDeleteVehicle = async (id: string) => {
    var response = await httpClient.vehicleService.softDeleteVehicle(id);
    if (response) {
      toast.success("Deleted");
      handleCloseDeleteVehicleDialog();
      window.location.reload();
    } else {
      toast.error("An error has occurred, please try again later");
      handleCloseDeleteVehicleDialog();
    }
  };

  const handleClosePRForm = () => {
    setIsOpenPRForm(false);
    setParkingRequest({
      description: "",
      parkingSpotId: "",
      vehicleId: vehicle.id,
    });
  };

  const handleCloseDeleteVehicleDialog = () => {
    setOpenDeleteVehicle(false);
  };

  const handleOpenDeleteVehicleDialog = () => {
    setOpenDeleteVehicle(true);
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
          <Stack direction="row" spacing={2}>
            <Button
              startIcon={<Iconify icon="eva:edit-fill" />}
              variant="outlined"
              onClick={() => handleOpenForm()}
            >
              {!vehicle.id ? "Add Vehicle" : "Update Vehicle Info"}
            </Button>
            <Button
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              variant="outlined"
              color="error"
              disabled={!vehicle || !vehicle.id}
              onClick={() => handleOpenDeleteVehicleDialog()}
            >
              Delete Vehicle
            </Button>
          </Stack>
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
              ? fDate(new Date(vehicle.lastUpdatedDateUtc), "dd/MM/yyyy")
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
              getOptionLabel={(option: IParkingSpot) =>
                option.parkingSpotName +
                  " - " +
                  `${option.currentQuantity}/${option.capacitySpots} Spots` ||
                "--"
              }
              value={parkingSpot}
              onChange={(event, newValue: IParkingSpot) => {
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
      <Dialog
        open={openDeleteVehicle}
        onClose={handleCloseDeleteVehicleDialog}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            Are you sure you want to delete the vehicle ? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteVehicleDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteVehicle(vehicle?.id)}
            color="error"
            variant="contained"
          >
            Delete Vehicle
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
