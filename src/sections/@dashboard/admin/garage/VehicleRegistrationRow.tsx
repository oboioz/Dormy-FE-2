import { useState } from 'react';
// @mui
import {
  Button,
  Stack,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
// @types
// components
import { IParkingRequest } from '../../../../@types/vehicle';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { fDateTime } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

type Props = {
  row: IParkingRequest;
  onVerifyRow: VoidFunction;
  onDenyRow: VoidFunction;
};

export default function VehicleRegistrationRow({
  row,
  onVerifyRow,
  onDenyRow,
}: Props) {

  const { parkingRequestID, timestamp, userID, vehicleID, status } = row;

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
            {parkingRequestID}
          </Typography>
        </TableCell>

        <TableCell align="left">{fDateTime(timestamp)}</TableCell>
        <TableCell align="left">{userID.firstName}{userID.lastName}</TableCell>
        <TableCell align="left">{userID.phoneNumber}</TableCell>
        <TableCell align="left">{vehicleID.type}</TableCell>
        <TableCell align="left">{vehicleID.licensePlate} </TableCell>


        <TableCell align="right">
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
            <Button variant="outlined" >Deny</Button>
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
