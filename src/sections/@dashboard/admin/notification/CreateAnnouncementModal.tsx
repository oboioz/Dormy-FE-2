import { Modal, Box, Stack, Typography, Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { RHFTextField } from "../../../../components/hook-form";
import { RHFDatePicker } from "../../../../components/hook-form/RHFDatePicker";
import ConfirmDialog from "../../../../components/confirm-dialog";
import { useState } from "react";

type CreateAnnouncementModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    title: string;
    description: string;
  }) => void;
};

export default function CreateAnnouncementModal({
    open,
    onClose,
    onSubmit,
    }: CreateAnnouncementModalProps) {
    const methods = useForm({
        defaultValues: {
        title: "",
        description: "",
        },
        mode: "onBlur", // Validate on blur
    });

    const { handleSubmit, reset, watch } = methods;

    const [openConfirm, setOpenConfirm] = useState(false);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleFormSubmit = (data: { title: string; description: string }) => {
        onSubmit(data);
        reset(); // Reset the form after submission
        onClose(); // Close the modal
    };

    const handleConfirmSubmit = () => {
        handleSubmit(handleFormSubmit)(); // Trigger form submission
        handleCloseConfirm(); // Close the confirmation modal
    };

    return (
        <>
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
                Post new announcement
            </Typography>
            <FormProvider {...methods}>
                <form onSubmit={(e) => e.preventDefault()}>
                <Stack spacing={3}>
                    <RHFTextField
                    name="title"
                    label="Title"
                    rules={{ required: "Title is required" }} // Validation rule
                    />

                    <RHFTextField
                    name="description"
                    label="Description"
                    multiline
                    rows={3}
                    rules={{ required: "Description is required" }} // Validation rule
                    />
                </Stack>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    sx={{ mt: 3 }}
                >
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                    variant="contained"
                    onClick={handleOpenConfirm} // Open confirmation modal
                    disabled={!watch("title") || !watch("description")} // Disable if fields are empty
                    >
                    Post announcement
                    </Button>
                </Stack>
                </form>
            </FormProvider>
            </Box>
        </Modal>

        {/* Confirmation Dialog */}
        <ConfirmDialog
            open={openConfirm}
            onClose={handleCloseConfirm}
            title="Confirm Post"
            content={
                <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Are you sure you want to post this announcement?
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Title:</strong> {watch("title") || "N/A"}
                </Typography>
                <Typography variant="body2">
                    <strong>Description:</strong> {watch("description") || "N/A"}
                </Typography>
                </Box>
            }
            action={
                <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmSubmit}
                >
                Confirm
                </Button>
            }
        />
        </>
    );
}
