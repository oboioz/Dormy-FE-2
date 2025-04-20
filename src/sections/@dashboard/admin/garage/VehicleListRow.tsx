import { useState } from "react";
import {
  Button,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import ConfirmDialog from "../../../../components/confirm-dialog";
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import MenuPopover from "../../../../components/menu-popover";
import { IVehicle } from "../../../../models/responses/VehicleModels";
import { httpClient } from "../../../../services";
import { toast } from "react-toastify";

type Props = {
  row: IVehicle;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function VehicleListRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const {
    id,
    licensePlate,
    vehicleType,
    parkingSpotName,
    userFullname,
    isDeleted,
  } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

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

  const updateVehicleHistory = async (vehicleId: string) => {
    var response = await httpClient.vehicleService.updateVehicleHistory(
      vehicleId
    );
    if (response) {
      toast.success("Updated vehicle history");
      window.location.reload();
    } else {
      toast.error("An error has occurred, please try again later");
    }
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Iconify icon="mdi:car" width={20} height={20} />{" "}
            {/* Vehicle Icon */}
            {vehicleType}
          </Typography>
        </TableCell>

        <TableCell align="left">{licensePlate}</TableCell>

        <TableCell align="left">{parkingSpotName || "N/A"}</TableCell>

        <TableCell align="left">{userFullname}</TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={(!isDeleted && "success") || "error"}
            sx={{ textTransform: "capitalize" }}
          >
            {isDeleted ? "Inactive" : "Active"}
          </Label>
        </TableCell>

        <TableCell align="center">
          <Button
            variant="contained"
            color="success"
            disabled={isDeleted}
            startIcon={<Iconify icon="eva:arrow-circle-up-outline" />}
            endIcon={<Iconify icon="eva:arrow-circle-down-outline" />}
            onClick={() => updateVehicleHistory(id)}
            sx={{ mr: 1 }}
          >
            In/Out
          </Button>
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
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleOpenConfirm}>
            Delete
          </Button>
        }
      />
    </>
  );
}
