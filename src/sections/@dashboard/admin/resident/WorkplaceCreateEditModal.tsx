import {
    Button,
    Grid,
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider, { RHFTextField } from "../../../../components/hook-form";
import Iconify from "../../../../components/iconify";
import {
    WorkplaceCreateModel,
    WorkplaceUpdateModel,
} from "../../../../models/responses/WorkplaceModels";
import { useEffect } from "react";

const UpdateSchema = Yup.object().shape({
    name: Yup.string()
        .required("Workplace name is required")
        .min(1, "Minimum 1 character"),
    address: Yup.string().required("Address is required!"),
    abbrevation: Yup.string().required("Abbreviation is required!"),
});

const defaultValues: WorkplaceCreateModel = {
    name: "",
    address: "",
    abbrevation: "",
};

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: WorkplaceCreateModel) => void;
    initialData?: WorkplaceCreateModel | null;
};

export default function WorkplaceCreateEditModal({
    open,
    onClose,
    onSubmit,
    initialData,
}: Props) {
    const methods = useForm<WorkplaceCreateModel>({
        resolver: yupResolver(UpdateSchema) as any,
        defaultValues: initialData || defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    useEffect(() => {
        if (initialData) {
        reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
            {initialData ? "Edit Workplace" : "Create Workplace"}
        </DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <DialogContent dividers>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Stack spacing={2}>
                    <Typography variant="h6">Workplace Information</Typography>

                    <RHFTextField name="name" label="Name" />

                    <RHFTextField name="address" label="Address" />

                    <RHFTextField name="abbrevation" label="Abbreviation" />
                </Stack>
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
            <Button onClick={onClose} variant="outlined">
                Cancel
            </Button>
            <LoadingButton
                variant="contained"
                type="submit"
                loading={isSubmitting}
            >
                {initialData ? "Update" : "Create"}
            </LoadingButton>
            </DialogActions>
        </FormProvider>
        </Dialog>
    );
}
