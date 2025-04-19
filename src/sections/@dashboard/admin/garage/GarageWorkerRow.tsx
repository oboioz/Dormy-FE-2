import {
  Button,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { Props } from "simplebar-react";
import ConfirmDialog from "../../../../components/confirm-dialog";
import { CustomAvatar } from "../../../../components/custom-avatar";
import Iconify from "../../../../components/iconify";
import MenuPopover from "../../../../components/menu-popover";
import { UserInformation } from "../../../../models/responses/UserModel";

export interface IWorkerProps {
  row: UserInformation;
}

export default function GarageWorkerRow({ row }: IWorkerProps) {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    jobTitle,
    gender,
    dateOfBirth,
    userName,
  } = row;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openViewDetail, setOpenViewDetail] = useState(false); // State for the View Detail modal

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

  const handleOpenViewDetail = () => {
    setOpenViewDetail(true);
    handleClosePopover();
  };

  const handleCloseViewDetail = () => {
    setOpenViewDetail(false);
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar name={firstName} />
            <div>
              <Typography variant="subtitle2" noWrap>
                {firstName} {lastName}
              </Typography>
            </div>
          </Stack>
        </TableCell>

        <TableCell align="left">{phoneNumber}</TableCell>
        <TableCell align="left">{email}</TableCell>
        <TableCell align="left">{jobTitle}</TableCell>

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
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleOpenViewDetail}>
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>

        {/* <MenuItem
          onClick={() => {
            // onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
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

      {/* <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseConfirm}
          >
            Delete
          </Button>
        }
      /> */}

      {/* View Detail Modal */}
      <Dialog
        open={openViewDetail}
        onClose={handleCloseViewDetail}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Worker Details</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Typography variant="body2">
              <b>First Name:</b> {firstName}
            </Typography>
            <Typography variant="body2">
              <b>Last Name:</b> {lastName}
            </Typography>
            <Typography variant="body2">
              <b>Phone Number:</b> {phoneNumber}
            </Typography>
            <Typography variant="body2">
              <b>Email:</b> {email}
            </Typography>
            <Typography variant="body2">
              <b>Job Title:</b> {jobTitle}
            </Typography>
            <Typography variant="body2">
              <b>Gender:</b> {gender}
            </Typography>
            <Typography variant="body2">
              <b>Date of Birth:</b>{" "}
              {dateOfBirth
                ? new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(dateOfBirth))
                : "--/--/--"}
            </Typography>
            <Typography variant="body2">
              <b>Username:</b> {userName}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDetail}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
