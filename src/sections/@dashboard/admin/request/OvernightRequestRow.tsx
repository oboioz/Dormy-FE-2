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
import Label from "../../../../components/label";
import MenuPopover from "../../../../components/menu-popover";
import { fDateTime } from "../../../../utils/formatTime";
import { OvernightAbsenceResponseModel } from "../../../../models/responses/OvernightAbsenceResponseModels";

type Props = {
  row: OvernightAbsenceResponseModel;
  selected: boolean;
  onApproveReject: (id: string, isApprove: boolean) => void;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function OvernightRequestRow({
  row,
  selected,
  onApproveReject,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const {
    id,
    startDateTime,
    endDateTime,
    reason,
    status,
    phoneNumber,
    email,
    fullName,
    createdDateUtc,
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

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {fDateTime(startDateTime)} {"-"} {fDateTime(endDateTime)}
          </Typography>
        </TableCell>

        <TableCell align="left">{fDateTime(createdDateUtc)}</TableCell>

        <TableCell align="left">{fullName}</TableCell>

        <TableCell align="left">{phoneNumber}</TableCell>

        <TableCell align="left">{reason}</TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={
              (status === "SUBMITTED" && "warning") ||
              (status === "APPROVED" && "success") ||
              (status === "REJECTED" && "error") ||
              (status === "CANCELLED" && "default") ||
              "default"
            }
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
          disabled={status !== "SUBMITTED"}
          sx={{ color: "success.main" }}
          onClick={() => {
            onApproveReject(id, true);
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:checkmark-circle-2-outline" /> {/* Approve Icon */}
          Approve
        </MenuItem>
        <MenuItem
          disabled={status !== "SUBMITTED"}
          onClick={() => {
            onApproveReject(id, false);
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:close-circle-outline" /> {/* Reject Icon */}
          Reject
        </MenuItem>
        {/* <MenuItem
          disabled={status !== "SUBMITTED"}
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem> */}
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
