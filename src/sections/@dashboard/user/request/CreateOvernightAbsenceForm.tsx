import { Modal, Box, Stack, Typography, Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { RHFTextField } from "../../../../components/hook-form";
import { RHFDatePicker } from "../../../../components/hook-form/RHFDatePicker";

type CreateOvernightAbsenceModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    startDateTime: string;
    endDateTime: string;
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
        startDateTime: "",
        endDateTime: "",
        reason: "",
        },
        mode: "onBlur", // Validate on blur
    });

    const { handleSubmit, reset } = methods;

    const handleFormSubmit = (data: {
        startDateTime: string;
        endDateTime: string;
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
                                rules={{ required: "Start date is required" }} // Validation rule
                            />
                            <RHFDatePicker
                                name="endDateTime"
                                label="End Date"
                                rules={{ required: "End date is required" }} // Validation rule
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
