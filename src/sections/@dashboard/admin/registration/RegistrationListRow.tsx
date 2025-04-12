import { useState } from "react";
// @mui
import { Button, Stack, TableCell, TableRow, Typography } from "@mui/material";
// @types
// components
import { IRegistrationForm } from "../../../../@types/user";
import ConfirmDialog from "../../../../components/confirm-dialog";
import { fDateTime } from "../../../../utils/formatTime";

// ----------------------------------------------------------------------

type Props = {
  row: IRegistrationForm;
  onVerifyRow: VoidFunction;
  onDenyRow: VoidFunction;
};

export default function RoomTypeRow({ row, onVerifyRow, onDenyRow }: Props) {
  const { registrationInformation } = row;
  const { generalInformation, documents } = registrationInformation;
  // const { email, phoneNumber, gender, contract } = generalInformation;
  // const { submissionDate, status, roomID, contractID } = contract;
  // const { roomType, roomNumber, floorNumber, building } = roomID;

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {/* {contractID} */}
          </Typography>
        </TableCell>

        {/* <TableCell align="left">{fDateTime(submissionDate)}</TableCell> */}
        {/* <TableCell align="left">{email}</TableCell>
        <TableCell align="left">{phoneNumber}</TableCell>
        <TableCell align="left">{gender}</TableCell> */}
        <TableCell align="left">
          {/* {building.name}
          {floorNumber}
          {roomNumber}{" "} */}
        </TableCell>
        {/* <TableCell align="lyaeft">{roomType.roomTypeName}</TableCell> */}

        <TableCell align="right">
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
            <Button variant="contained" color="error">
              Deny
            </Button>
            <Button variant="contained">Verify</Button>
          </Stack>
        </TableCell>
      </TableRow>

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
