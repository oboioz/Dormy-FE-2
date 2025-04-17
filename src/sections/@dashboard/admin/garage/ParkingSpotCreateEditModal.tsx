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
import { useEffect } from "react";

type FormValuesProps = {
    parkingSpotName: string;
    capacitySpots: number;
};

const UpdateSchema = Yup.object().shape({
    parkingSpotName: Yup.string().required("Spot Name is required"),
    capacitySpots: Yup.number()
        .required("Capacity is required!")
        .min(1, "Minimum value is >= 1"),
});

const defaultValues: FormValuesProps = {
    parkingSpotName: "",
    capacitySpots: 1,
};

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: FormValuesProps) => void;
    initialData?: FormValuesProps | null;
};

export default function ParkingSpotCreateEditModal({
    open,
    onClose,
    onSubmit,
    initialData,
}: Props) {
    const methods = useForm<FormValuesProps>({
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
                {initialData ? "Edit Parking Spot" : "Create Parking Spot"}
            </DialogTitle>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Stack spacing={2}>
                        <Typography variant="h6">
                        Information of the Parking Spot
                        </Typography>

                        <RHFTextField name="parkingSpotName" label="Spot Name" />

                        <RHFTextField
                        name="capacitySpots"
                        label="Capacity"
                        InputProps={{
                            type: "number",
                        }}
                        />
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
