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
import MenuPopover from "../../../../components/menu-popover";
import { IRequest } from "../../../../models/responses/RequestModel";
import ConfirmDialog from "../../../../components/confirm-dialog";
import RequestStatusTag from "../../../tag/RequestStatusTag";

type Props = {
  row: IRequest;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onCancelRow: VoidFunction;
};

export default function MyRequestRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onCancelRow,
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
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })}
        </TableCell>

        <TableCell align="left">{buildingName}</TableCell>

        <TableCell align="left">{roomNumber}</TableCell>

        <TableCell align="left">{description}</TableCell>

        <TableCell align="left">
          <RequestStatusTag status={status} />
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
            onEditRow();
          }}
          sx={{ color: "primary.main" }}
        >
          <Iconify icon="eva:edit-outline" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:close-circle-outline" />
          Cancel
        </MenuItem>
      </MenuPopover>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Cancel Request"
        content={
          <>
            Are you sure want to <strong>cancel</strong> this request?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onCancelRow();
              handleCloseConfirm();
            }}
          >
            Confirm cancel
          </Button>
        }
      />
    </>
  );
}
