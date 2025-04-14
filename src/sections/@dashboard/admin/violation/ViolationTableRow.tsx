import { useState } from "react";
import {
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import ConfirmDialog from "../../../../components/confirm-dialog";
import Iconify from "../../../../components/iconify";
import MenuPopover from "../../../../components/menu-popover";
import { fDate, fDateTime } from "../../../../utils/formatTime";
import { IViolation } from "../../../../models/responses/ViolationModels";
import { DateTimeUtils } from "../../../../utils/DateTimeUtils";
import { fCurrency } from "../../../../utils/formatNumber";

type Props = {
  row: IViolation;
  selected: boolean;
  onSelectRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function ViolationTableRow({
  row,
  selected,
  onSelectRow,
  onEditRow,
  onDeleteRow,
}: Props) {
  const {
    userId,
    fullName,
    description,
    penalty,
    violationDate,
    createdDateUtc,
    dateOfBirth,
    email,
    id,
    phoneNumber,
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

  return (
    <>
      <TableRow hover selected={selected} sx={{ opacity: isDeleted ? 0.5 : 1 }}>
        <TableCell padding="checkbox">
          <Checkbox
            disabled={isDeleted}
            checked={selected}
            onClick={onSelectRow}
          />
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {fullName}
          </Typography>
        </TableCell>

        <TableCell align="center">{fDate(violationDate, "dd/MM/yyyy")}</TableCell>

        <TableCell align="left">{description}</TableCell>

        <TableCell align="right">
          {fCurrency(penalty)}
        </TableCell>

        <TableCell align="left">{phoneNumber}</TableCell>

        <TableCell align="left">{email}</TableCell>

        <TableCell align="center">
          {fDate(dateOfBirth, "dd/MM/yyyy")}
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
          disabled={isDeleted}
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
        <MenuItem
          disabled={isDeleted}
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
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
