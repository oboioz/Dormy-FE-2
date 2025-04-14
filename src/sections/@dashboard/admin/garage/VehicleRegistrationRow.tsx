import { useState } from "react";
import { Button, Stack, TableCell, TableRow, Typography } from "@mui/material";
import ConfirmDialog from "../../../../components/confirm-dialog";
import { fDate, fDateTime } from "../../../../utils/formatTime";
import { IParkingRequest } from "../../../../models/responses/ParkingRequestModels";
import Label from "../../../../components/label";
import ParkingSpotStatusTag from "../../../tag/ParkingSpotStatusTag";
import RequestStatusTag from "../../../tag/RequestStatusTag";

type Props = {
  row: IParkingRequest;
  onApproveRow: VoidFunction;
  onRejectRow: VoidFunction;
};

export default function VehicleRegistrationRow({
  row,
  onApproveRow,
  onRejectRow,
}: Props) {
  const {
    id,
    approverUserFullName,
    createdDateUtc,
    description,
    licensePlate,
    parkingSpotName,
    parkingSpotStatus,
    vehicleType,
    userFullName,
    status,
  } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    onRejectRow();
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {parkingSpotName}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <ParkingSpotStatusTag status={parkingSpotStatus}/>
        </TableCell>
        <TableCell align="left">{userFullName}</TableCell>
        <TableCell align="left">{licensePlate} </TableCell>
        <TableCell align="left">{vehicleType}</TableCell>
        <TableCell align="left">{description}</TableCell>
        <TableCell align="left">{fDate(createdDateUtc, "dd/MM/yyyy")}</TableCell>
        <TableCell align="left">
          <RequestStatusTag status={status} />
        </TableCell>

        <TableCell align="left">
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="left"
            spacing={1}
          >
            <Button
              variant="contained"
              onClick={onApproveRow}
              disabled={status !== "SUBMITTED"}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              onClick={handleOpenConfirm}
              disabled={status !== "SUBMITTED"}
            >
              Reject
            </Button>
          </Stack>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Reject"
        content="Are you sure want to reject?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseConfirm}
          >
            Reject
          </Button>
        }
      />
    </>
  );
}
