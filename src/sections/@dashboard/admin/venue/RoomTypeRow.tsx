import { useState } from "react";
// @mui
import {
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
} from "@mui/material";
// @types
// components
import ConfirmDialog from "../../../../components/confirm-dialog";
import Iconify from "../../../../components/iconify";
import MenuPopover from "../../../../components/menu-popover";
import { IRoomType } from "../../../../models/responses/RoomTypeModels";
import { fCurrency } from "../../../../utils/formatNumber";
import CreateEditRoomTypeModal from "./CreateEditRoomTypeModal";

type Props = {
  row: IRoomType;
  selected: boolean;
  // onEditRow: (updatedRoomType: IRoomType) => void;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function RoomTypeRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { roomTypeName, description, price, capacity, isDeleted } = row;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

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

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
    handleClosePopover();
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  // const handleEditRoomType = (updatedRoomType: IRoomType) => {
  //   onEditRow(updatedRoomType);
  //   handleCloseEditModal();
  // };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell align="left">{roomTypeName}</TableCell>

        <TableCell align="left">{capacity}</TableCell>

        <TableCell align="left" sx={{ fontSize: "1rem" }}>
          {fCurrency(price)} VND
        </TableCell>

        <TableCell align="left">{description}</TableCell>

        {/* <TableCell align="left" sx={{ color: isDeleted ? "red" : "green" }}>
          {isDeleted ? "Yes" : "No"}
        </TableCell> */}

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
        {/* <MenuItem onClick={handleOpenEditModal} disabled={isDeleted}> */}
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
          disabled={isDeleted}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
          disabled={isDeleted}
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
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
      {/* <CreateEditRoomTypeModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        onSubmit={handleEditRoomType}
        initialData={row}
      /> */}
    </>
  );
}
