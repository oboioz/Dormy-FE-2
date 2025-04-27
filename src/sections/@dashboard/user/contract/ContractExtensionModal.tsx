import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { RHFDatePicker } from "../../../../components/hook-form/RHFDatePicker";
import { useEffect, useState } from "react";
import ConfirmDialog from "../../../../components/confirm-dialog";
import { toast } from "react-toastify";
import { PATH_USER } from "../../../../routes/paths";
import { useNavigate } from "react-router-dom";

type ContractExtensionModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { startDate: Date; endDate: Date }) => void;
  initialData?: { startDate: Date; endDate: Date };
};

export default function ContractExtensionModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: ContractExtensionModalProps) {
  const methods = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  });

  const { handleSubmit, reset } = methods;
  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<{
    startDate: Date;
    endDate: Date;
  } | null>(null);

  // Reset form values when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        startDate: initialData.startDate,
        endDate: initialData.endDate,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: { startDate: Date; endDate: Date }) => {
    setFormData(data);
    setConfirmOpen(true); // Open confirmation dialog
  };

  const handleConfirm = async () => {
    if (formData) {
      try {
        onSubmit(formData); // Notify parent component
        onClose(); // Close the modal
        navigate(PATH_USER.contract);
      } catch (error) {
        toast.error("Failed to extend the contract.");
      } finally {
        setConfirmOpen(false); // Close confirmation dialog
      }
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Extend Contract</DialogTitle>
        <DialogContent dividers>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Stack spacing={3}>
                <Typography variant="body2" color="text.secondary">
                  Please select the new start and end dates for the contract
                  extension.
                </Typography>
                <RHFDatePicker
                  name="startDate"
                  label="Start Date"
                  rules={{ required: "Start date is required" }}
                />
                <RHFDatePicker
                  name="endDate"
                  label="End Date"
                  rules={{
                    required: "End date is required",
                    validate: (value) =>
                      value > methods.getValues("startDate") ||
                      "End date must be after the start date",
                  }}
                />
              </Stack>
              <DialogActions sx={{ mt: 3 }}>
                <Button onClick={onClose} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Extend Contract
                </Button>
              </DialogActions>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm Contract Extension"
        content="Do you want to extend the contract?"
        action={
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        }
      />
    </>
  );
}
