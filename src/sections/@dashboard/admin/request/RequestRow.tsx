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
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import MenuPopover from "../../../../components/menu-popover";
import { fDateTime } from "../../../../utils/formatTime";
import { IRequest } from "../../../../models/responses/RequestModel";
import ConfirmDialog from "../../../../components/confirm-dialog";

type Props = {
  row: IRequest;
  selected: boolean;
  onApproveRow: VoidFunction;
  onSelectRow: VoidFunction;
  onRejectRow: VoidFunction;
};

export default function RequestRow({
  row,
  selected,
  onApproveRow,
  onSelectRow,
  onRejectRow,
}: Props) {
  const {
    description,
    requestType,
    status,
    createdDateUtc,
    id,
    buildingName,
    roomNumber,
    isDeleted,
    userName,
  } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    onRejectRow();
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
            {requestType}
          </Typography>
        </TableCell>

        <TableCell align="left">
          {new Date(createdDateUtc).toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </TableCell>

        <TableCell align="left">{userName}</TableCell>

        <TableCell align="left">{buildingName}</TableCell>

        <TableCell align="left">{roomNumber}</TableCell>

        <TableCell align="left">{description}</TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={
              status === "SUBMITTED"
                ? "warning"
                : status === "REJECTED"
                ? "error"
                : status === "APPROVED"
                ? "success"
                : status === "CANCELED"
                ? "default"
                : undefined
            }
            sx={{ textTransform: "capitalize" }}
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="left">
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={handleOpenPopover}
            disabled={status !== "SUBMITTED"}
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
            handleClosePopover();
            onApproveRow();
          }}
          sx={{ color: "success.main" }}
        >
          <Iconify icon="eva:checkmark-circle-outline" />
          Approve
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:close-circle-outline" />
          Reject
        </MenuItem>
      </MenuPopover>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Reject"
        content="Are you sure want to reject?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => handleCloseConfirm()}
          >
            Reject
          </Button>
        }
      />
    </>
  );
}
