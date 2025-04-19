import { useState } from "react";
// @mui
import {
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
// @types
// components
import ConfirmDialog from "../../../../components/confirm-dialog";
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import MenuPopover from "../../../../components/menu-popover";
import { Room } from "../../../../models/responses/BuildingModels";
import RoomStatusTag from "../../../tag/RoomStatusTag";
import { RoomStatusEnum } from "../../../../models/enums/RoomStatusEnum";
import { httpClient } from "../../../../services";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";

type Props = {
  row: Room;
  selected: boolean;
  onDetailRow: VoidFunction;
  onSelectRow: VoidFunction;
};

export default function RoomTableRow({
  row,
  selected,
  onDetailRow,
  onSelectRow,
}: Props) {
  const {
    roomNumber,
    floorNumber,
    totalUsedBed,
    totalAvailableBed,
    status,
    roomTypeId,
    roomTypeName,
    id,
  } = row;

  const isActive = status === RoomStatusEnum.AVAILABLE;

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

  const handleUpdateRoomStatus = async (id: string) => {
    if (isActive) {
      var response = await httpClient.roomService.deactivateRoom(id);
      if (response === HttpStatusCode.Accepted) {
        toast.success("Success");
        window.location.reload();
      } else if (response === HttpStatusCode.Conflict) {
        toast.error("Can not deactivate room contains active contract");
      } else {
        toast.error("An error has occurred, please try again later");
      }
      handleCloseConfirm();
    } else {
      var response = await httpClient.roomService.activeRoom(id);
      if (response === HttpStatusCode.Accepted) {
        toast.success("Success");
        window.location.reload();
      } else {
        toast.error("An error has occurred, please try again later");
      }
      handleCloseConfirm();
    }
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell align="center">{floorNumber}</TableCell>

        <TableCell align="center">
          <Typography variant="subtitle2" noWrap>
            {roomNumber}
          </Typography>
        </TableCell>

        <TableCell align="center">
          {totalUsedBed.toString() + "/" + totalAvailableBed.toString()}
        </TableCell>

        <TableCell align="left">{roomTypeName}</TableCell>

        <TableCell align="left">
          <RoomStatusTag status={status} />
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
            onDetailRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Detail
        </MenuItem>
        {totalUsedBed <= 0 && (
          <MenuItem
            onClick={() => {
              handleOpenConfirm();
              handleClosePopover();
            }}
            sx={{ color: isActive ? "warning.main" : "success.main" }} // Updated color
          >
            <Iconify
              icon={
                isActive
                  ? "eva:slash-outline"
                  : "eva:checkmark-circle-2-outline"
              } // Updated icon
            />
            {isActive ? "Deactivate" : "Activate"} {/* Updated text */}
          </MenuItem>
        )}
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={isActive ? "Deactivate Room" : "Activate Room"} // Updated title
        content={
          isActive
            ? "Are you sure you want to deactivate this room?"
            : "Are you sure you want to activate this room?"
        } // Updated content
        action={
          <Button
            variant="contained"
            color={isActive ? "warning" : "success"} // Updated button color
            onClick={() => handleUpdateRoomStatus(id)} // Updated to close dialog after action
          >
            {isActive ? "Deactivate" : "Activate"} {/* Updated button text */}
          </Button>
        }
      />
    </>
  );
}
