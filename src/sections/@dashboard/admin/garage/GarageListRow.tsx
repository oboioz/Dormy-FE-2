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
import {
  IParkingSpot,
  IParkingSpotUpdateModel,
} from "../../../../models/responses/ParkingSpotModels";
import { httpClient } from "../../../../services";
import { toast } from "react-toastify";
import {
  emptyRows,
  TableEmptyRows,
  TableNoData,
} from "../../../../components/table";
import ParkingSpotStatusTag from "../../../tag/ParkingSpotStatusTag";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../../routes/paths";
import { is } from "date-fns/locale";

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

  const navigate = useNavigate();
  const isActive = status === "AVAILABLE";
  const isDisableEdit = currentQuantity > 0 || !isActive;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openConfirmCreateParkingInvoice, setOpenConfirmCreateParkingInvoice] =
    useState(false);
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

  const handleOpenConfirmCreateParkingInvoice = () => {
    setOpenConfirmCreateParkingInvoice(true);
  };

  const handleCloseConfirmCreateParkingInvoice = () => {
    setOpenConfirmCreateParkingInvoice(false);
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
    const payload: IParkingSpotUpdateModel = {
      id: id,
      parkingSpotName: parkingSpotEditName,
      capacitySpots: capacity,
    };
    var response = await httpClient.parkingSpotService.updateParkingSpot(
      payload
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

  const handledUpdateStatus = async (id: string) => {
    var status = isActive ? "UNDER_MAINTENANCE" : "AVAILABLE";
    var response = await httpClient.parkingSpotService.updateStatus(id, status);
    if (response) {
      toast.success("Update status success");
      handleCloseConfirm();
      window.location.reload();
    } else {
      toast.error("Update status failed");
      handleCloseConfirm();
    }
  };

  const handleCreateBatchParkingInvoices = async (parkingSpotId: string) => {
    var response =
      await httpClient.parkingSpotService.createParkingSpotInvoiceForAllUsers(
        parkingSpotId
      );
    if (response) {
      toast.success("Create batch parking invoices successfully!");
      handleCloseConfirmCreateParkingInvoice();
      navigate(PATH_ADMIN.invoice.parkingFee);
    } else {
      toast.error("Create batch parking invoices failed");
      handleCloseConfirmCreateParkingInvoice();
    }
  };

  return (
    <>
      <TableRow hover selected={selected} sx={{ opacity: 1 }}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            disabled={!isActive}
          />
        </TableCell>

        <TableCell>
          <Typography
            variant="subtitle2"
            noWrap
            // sx={{ textDecoration: !isActive ? "line-through" : "none" }}
          >
            {parkingSpotName}
          </Typography>
        </TableCell>

        <TableCell align="center" sx={{ fontSize: "1rem" }}>
          {capacitySpots}
        </TableCell>

        <TableCell align="center" sx={{ fontSize: "1rem" }}>
          {currentQuantity}
          {/* {"/"}
          {capacitySpots} */}
        </TableCell>

        <TableCell align="left">
          <ParkingSpotStatusTag status={status} />
        </TableCell>

        <TableCell align="center">
          <Button
            color="warning"
            variant="contained"
            // startIcon={<Iconify icon="eva:plus-fill" />}
            disabled={!isActive}
            onClick={handleOpenConfirmCreateParkingInvoice}
          >
            Create parking invoice
          </Button>
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
          // disabled={isDisableEdit}
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: isActive ? "error.main" : "success.main" }}
        >
          <Iconify icon={isActive ? "mdi:cancel" : "mdi:check-circle"} />
          {isActive ? "Deactivate" : "Activate"}
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={isActive ? "Deactivate Parking Spot" : "Activate Parking Spot"}
        content={
          isActive
            ? "Are you sure want to deactivate?"
            : "Are you sure want to activate?"
        }
        action={
          <Button
            variant="contained"
            color={isActive ? "error" : "success"}
            onClick={() => handledUpdateStatus(id)}
          >
            {isActive ? "Deactivate" : "Activate"}
          </Button>
        }
      />

      <ConfirmDialog
        open={openConfirmCreateParkingInvoice}
        onClose={handleCloseConfirmCreateParkingInvoice}
        title="Confirm to create batch parking invoices"
        content="Are you sure want to create batch parking invoices?"
        action={
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleCreateBatchParkingInvoices(id)}
          >
            Create batch parking invoices
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
