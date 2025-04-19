import { useEffect, useState } from "react";
// @mui
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TableCell,
  TableRow,
  TextField,
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
import { IRoomType } from "../../../../models/responses/RoomTypeModels";

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
  const [openEditConfirm, setOpenEditConfirm] = useState(false);
  const [roomType, setRoomType] = useState<string>(roomTypeId);
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenEditConfirm = () => {
    setOpenEditConfirm(true);
    handleClosePopover();
  };

  const handleCloseEditConfirm = () => {
    setOpenEditConfirm(false);
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

  const fetchRoomTypes = async () => {
    const response = await httpClient.roomTypeService.getRoomTypeBatch();
    if (response) {
      setRoomTypes(response);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const updateRoomType = async (roomTypeId: string) => {
    var response = await httpClient.roomService.updateRoom({
      id: id,
      floorNumber: floorNumber,
      roomTypeId: roomTypeId,
    });

    if (response === HttpStatusCode.Accepted) {
      toast.success("Update success");
      window.location.reload();
    } else {
      toast.error("An error has occurred, please try again later");
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
      >
        <MenuItem
          disabled={totalUsedBed > 0}
          onClick={() => handleOpenEditConfirm()}
        >
          <Iconify icon="eva:edit-fill" />
          Change Room Type
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDetailRow();
            handleClosePopover();
          }}
          sx={{ color: "primary.main" }}
        >
          <Iconify icon="eva:eye-outline" />
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

      <Dialog
        open={openEditConfirm}
        onClose={() => handleCloseEditConfirm()}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Room Type</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <FormControl required fullWidth margin="dense">
              <InputLabel id="roomTypeId-label">Room Type</InputLabel>
              <Select
                id={`roomTypeId`}
                labelId={`roomTypeId-label`}
                label="Room Type"
                value={roomType}
                onChange={(event) => setRoomType(event.target.value)}
              >
                {roomTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.roomTypeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseEditConfirm()}>Cancel</Button>
          <Button variant="contained" onClick={() => updateRoomType(roomType)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
