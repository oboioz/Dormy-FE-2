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
import MenuPopover from "../../../../components/menu-popover";
import { fDateTime } from "../../../../utils/formatTime";
import { WorkplaceModel } from "../../../../models/responses/WorkplaceModels";

// ----------------------------------------------------------------------

type Props = {
  row: WorkplaceModel;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function WorkplaceTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const {
    id,
    name,
    address,
    createdBy,
    createdDateUtc,
    abbrevation,
    createdByCreator,
  } = row;

  // const amount = 8000;

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

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </TableCell>

        <TableCell align="left">{address}</TableCell>

        <TableCell align="left">{abbrevation}</TableCell>

        <TableCell align="left">{createdByCreator}</TableCell>

        <TableCell align="left">{fDateTime(createdDateUtc)}</TableCell>

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
