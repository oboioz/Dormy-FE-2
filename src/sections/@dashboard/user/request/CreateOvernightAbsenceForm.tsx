import { Modal, Box, Stack, Typography, Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { RHFTextField } from "../../../../components/hook-form";
import { RHFDatePicker } from "../../../../components/hook-form/RHFDatePicker";

type CreateOvernightAbsenceModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    startDateTime: Date;
    endDateTime: Date;
    reason: string;
  }) => void;
};

export default function CreateOvernightAbsenceModal({
  open,
  onClose,
  onSubmit,
}: CreateOvernightAbsenceModalProps) {
  const methods = useForm({
    defaultValues: {
      startDateTime: new Date(),
      endDateTime: new Date(),
      reason: "",
    },
    mode: "onBlur", // Validate on blur
  });

  const { handleSubmit, reset, watch } = methods;

  const handleFormSubmit = (data: {
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
          width: { xs: 300, sm: 500, md: 600 }, // Adjust width for different screen sizes
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          New Overnight Absence
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Stack spacing={3}>
              <RHFDatePicker
                name="startDateTime"
                label="Start Date"
                rules={{
                  required: "Start date is required",
                  validate: (value) => {
                    const end = watch("endDateTime");
                    if (value > end) {
                      return "Start date must be less than or equal to end date";
                    }
                    return true;
                  },
                }} // Validation rule
                minDate={new Date()} // Prevent past dates
              />
              <RHFDatePicker
                name="endDateTime"
                label="End Date"
                rules={{
                  required: "End date is required",
                  validate: (value) => {
                    const start = watch("startDateTime");
                    if (start > value) {
                      return "End date must be greater than or equal to start date";
                    }
                    return true;
                  },
                }} // Validation rule
                minDate={new Date()} // Prevent past dates
              />
              <RHFTextField
                name="reason"
                label="Reason"
                multiline
                rows={3}
                rules={{ required: "Reason is required" }} // Validation rule
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
                Submit
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
}
