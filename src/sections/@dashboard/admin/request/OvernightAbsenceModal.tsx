import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { OvernightAbsenceResponseModel } from "../../../../models/responses/OvernightAbsenceResponseModels";
import { fDate } from "../../../../utils/formatTime";
import ConfirmDialog from "../../../../components/confirm-dialog";
import { httpClient } from "../../../../services";
import { toast } from "react-toastify";
import { useState } from "react";
import OvernightAbsenceStatusTag from "../../../tag/OvernightAbsenceStatusTag";

type OvernightAbsenceModalProps = {
  open: boolean;
  onClose: () => void;
  overnightAbsence: OvernightAbsenceResponseModel;
};

export default function OvernightAbsenceModal({
  open,
  onClose,
  overnightAbsence,
  onStatusChange,
}: OvernightAbsenceModalProps & {
  onStatusChange: (newStatus: string) => void;
}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    "APPROVE" | "REJECT" | null
  >(null);

  const handleOpenConfirm = (action: "APPROVE" | "REJECT") => {
    setConfirmAction(action);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setConfirmAction(null);
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;

    try {
      const payload = {
        isApproved: confirmAction === "APPROVE" ? true : false,
      };
      const success = await httpClient.overnightAbsenceService.approveOrRejectOvernightAbsence(
        overnightAbsence.id,
        payload
      );

      if (success) {
        const newStatus =
          confirmAction === "APPROVE" ? "APPROVED" : "REJECTED";
        toast.success(`Overnight absence ${confirmAction.toLowerCase()}d successfully.`);
        onStatusChange(newStatus);
        onClose();
      } else {
        toast.error(`Failed to ${confirmAction.toLowerCase()} the overnight absence.`);
      }
    } catch (error) {
      toast.error(
        `Error during ${confirmAction.toLowerCase()} action:` + error
      );
    } finally {
      handleCloseConfirm();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Overnight Absence Details</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Typography variant="body2">
              <strong>Requester:</strong> {overnightAbsence.fullName}
            </Typography>
            <Typography variant="body2">
              <strong>Phone Number:</strong> {overnightAbsence.phoneNumber}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {overnightAbsence.email}
            </Typography>
            <Typography variant="body2">
              <strong>Start date:</strong>{" "}
              {fDate(overnightAbsence.startDateTime, "dd/MM/yyyy")}
            </Typography>
            <Typography variant="body2">
              <strong>End date:</strong>{" "}
              {fDate(overnightAbsence.endDateTime, "dd/MM/yyyy")}
            </Typography>
            <Typography variant="body2">
              <strong>Reason:</strong> {overnightAbsence.reason}
            </Typography>
            <Typography variant="body2">
              <strong>Status:</strong> <OvernightAbsenceStatusTag status={overnightAbsence.status} />
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          {overnightAbsence.status === "SUBMITTED" ? (
            <>
              <Button
                onClick={() => handleOpenConfirm("APPROVE")}
                variant="contained"
                color="success"
              >
                Approve
              </Button>
              <Button
                onClick={() => handleOpenConfirm("REJECT")}
                variant="contained"
                color="error"
              >
                Reject
              </Button>
            </>
          ) : null}
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Confirm Dialog */}
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={
          confirmAction === "APPROVE" ? "Approve overnight absence" : "Reject overnight absence"
        }
        content={`Are you sure you want to ${
          confirmAction === "APPROVE" ? "approve" : "reject"
        } this contract?`}
        action={
          <Button
            variant="contained"
            color={confirmAction === "APPROVE" ? "success" : "error"}
            onClick={handleConfirmAction}
          >
            {confirmAction === "APPROVE" ? "Approve" : "Reject"}
          </Button>
        }
      />
    </>
  );
}
