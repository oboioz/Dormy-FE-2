import { Modal, Box, Stack, Typography, Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { RHFTextField } from "../../../../components/hook-form";
import { RHFDatePicker } from "../../../../components/hook-form/RHFDatePicker";
import { DateTimeUtils } from "../../../../utils/DateTimeUtils";
import { useEffect } from "react";

type EditOvernightAbsenceModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    id: string;
    startDateTime: Date;
    endDateTime: Date;
    reason: string;
  }) => void;
  initialData: {
    id: string;
    startDateTime: Date;
    endDateTime: Date;
    reason: string;
  };
};

export default function EditOvernightAbsenceModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: EditOvernightAbsenceModalProps) {
  const methods = useForm({
    defaultValues: {
      reason: "",
      startDateTime: null,
      endDateTime: null,
    },
    mode: "onBlur", // Validate on blur
  });

  const { handleSubmit, reset } = methods;

  // Update form values when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        reason: initialData.reason,
        startDateTime: initialData.startDateTime,
        endDateTime: initialData.endDateTime,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: {
    id: string;
    startDateTime: Date;
    endDateTime: Date;
    reason: string;
  }) => {
    onSubmit(data);
    reset(); // Reset the form after submission
    onClose(); // Close the modal
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 300, sm: 500, md: 600 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          Edit Overnight Absence
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Stack spacing={3}>
              <RHFDatePicker
                name="startDateTime"
                label="Start Date"
                rules={{ required: "Start date is required" }}
              />
              <RHFDatePicker
                name="endDateTime"
                label="End Date"
                rules={{ required: "End date is required" }}
              />
              <RHFTextField
                name="reason"
                label="Reason"
                multiline
                rows={3}
                rules={{ required: "Reason is required" }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 3 }}
            >
              <Button onClick={onClose}>Cancel</Button>
              <Button variant="contained" type="submit">
                Save Changes
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
}
