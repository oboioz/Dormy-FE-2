import { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ConfirmDialog from "../../../../components/confirm-dialog";
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import MenuPopover from "../../../../components/menu-popover";
import { IParkingSpot } from "../../../../models/responses/ParkingSpotModels";
import { httpClient } from "../../../../services";
import { toast } from "react-toastify";
import {
  emptyRows,
  TableEmptyRows,
  TableNoData,
} from "../../../../components/table";

type Props = {
  row: IParkingSpot;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function GarageListRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const {
    parkingSpotName,
    capacitySpots,
    currentQuantity,
    status,
    isDeleted,
    id,
  } = row;

  const isDisableEdit = currentQuantity > 0 || isDeleted;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [parkingSpotEditName, setParkingPotEditName] =
    useState<string>(parkingSpotName);
  const [capacity, setCapacity] = useState<number>(capacitySpots);
  const [nameError, setNameError] = useState<boolean>(false);
  const [capacityError, setCapacityError] = useState<boolean>(false);
  const isNotChange =
    parkingSpotEditName === parkingSpotName && capacitySpots === capacity;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenDetailModal = () => {
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setParkingPotEditName(parkingSpotName);
    setCapacity(capacitySpots);
    setNameError(false);
    setCapacityError(false);
    setOpenEditModal(false);
  };

  const handleParkingSpotNameChange = (name: string) => {
    setParkingPotEditName(name);
    setNameError(!name);
  };

  const handleSetCapacity = (capacity: number) => {
    setCapacity(capacity);
    setCapacityError(capacity < 1);
  };

  const handleEditParkingSpot = async () => {
    var response = await httpClient.parkingSpotService.updateParkingSpot(
      id,
      parkingSpotEditName,
      capacity
    );

    if (response) {
      toast.success("Update success");
      handleCloseEditModal();
      window.location.reload();
    } else {
      toast.error("Update failed");
      handleCloseEditModal();
    }
  };

  const handleDelete = async (id: string) => {
    var response = await httpClient.parkingSpotService.softDelete(id);
    if (response) {
      toast.success("Delete success");
      handleCloseConfirm();
      window.location.reload();
    } else {
      toast.error("Delete failed");
      handleCloseConfirm();
    }
  };

  return (
    <>
      <TableRow hover selected={selected} sx={{ opacity: isDeleted ? 0.5 : 1 }}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            disabled={isDeleted}
          />
        </TableCell>

        <TableCell>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ textDecoration: isDeleted ? "line-through" : "none" }}
          >
            {parkingSpotName}
          </Typography>
        </TableCell>

        <TableCell align="left">{capacitySpots}</TableCell>

        <TableCell align="left">
          {currentQuantity}
          {"/"}
          {capacitySpots}
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={(status === "AVAILABLE" && "success") || "error"}
            sx={{ textTransform: "capitalize" }}
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenDetailModal();
            handleClosePopover();
          }}
          sx={{ color: "primary.main" }}
        >
          <Iconify icon="eva:info-outline" />
          Detail
        </MenuItem>
        <MenuItem
          disabled={isDisableEdit}
          onClick={() => {
            handleOpenEditModal();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
        <MenuItem
          disabled={isDisableEdit}
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        }
      />

      <Dialog
        open={openDetailModal}
        onClose={handleCloseDetailModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Iconify icon="mdi:car" width={24} height={24} />
          Vehicle List
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vehicle Type</TableCell>
                  <TableCell>License Plate</TableCell>
                  <TableCell>User Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.vehicles.map((vehicle, index) => (
                  <TableRow key={index}>
                    <TableCell>{vehicle.vehicleType}</TableCell>
                    <TableCell>{vehicle.licensePlate}</TableCell>
                    <TableCell>{vehicle.userFullname}</TableCell>
                  </TableRow>
                ))}
                <TableNoData isNotFound={row.vehicles.length === 0} />
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailModal}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditModal}
        onClose={handleCloseEditModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Parking Spot Information</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ marginTop: 1 }}>
            <TextField
              id="parkingSpotName"
              name="parkingSpotName"
              value={parkingSpotEditName}
              label="Parking Spot Name"
              required
              error={nameError}
              helperText={nameError && "Parking Spot Name is required."}
              placeholder="Parking Spot Name"
              onChange={(evt) => handleParkingSpotNameChange(evt.target.value)}
            />
            <TextField
              id="capacitySpots"
              name="capacitySpots"
              value={capacity}
              label="Capacity"
              required
              type="number"
              error={capacityError}
              helperText={capacityError && "Capacity must be greater than 0"}
              placeholder="Capacity"
              onChange={(evt) => handleSetCapacity(Number(evt.target.value))}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handleEditParkingSpot}
            disabled={nameError || capacityError || isNotChange}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
