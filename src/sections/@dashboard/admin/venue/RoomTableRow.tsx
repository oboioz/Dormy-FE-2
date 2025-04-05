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

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell align="left">{floorNumber}</TableCell>

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {roomNumber}
          </Typography>
        </TableCell>

        <TableCell align="left">
          {totalUsedBed.toString() + "/" + totalAvailableBed.toString()}
        </TableCell>

        <TableCell align="left">{roomTypeName?.toUpperCase()}</TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={(status === "banned" && "error") || "success"}
            sx={{ textTransform: "capitalize" }}
          >
            {status?.toUpperCase()}
          </Label>
        </TableCell>

        <TableCell align="left">
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
