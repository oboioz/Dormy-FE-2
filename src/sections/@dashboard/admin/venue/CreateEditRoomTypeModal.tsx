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
import { useEffect, useState } from "react";
import { RHFMultiSelect } from "../../../../components/hook-form/RHFSelect";
import { IRoomService } from "../../../../models/responses/RoomServiceModels";
import { httpClient } from "../../../../services";
import { toast } from "react-toastify";

const UpdateSchema = Yup.object().shape({
    roomTypeName: Yup.string().required("Name is required!"),
    description: Yup.string().required("Description is required!"),
    capacity: Yup.number()
        .required("Capacity is required!")
        .min(1, "Minimum value is >= 1"),
    price: Yup.number()
        .required("Price is required!")
        .min(0, "Minimum value is >= 0"),
    roomServiceIds: Yup.array().of(Yup.string()),
});

const defaultValues = {
    roomTypeName: "",
    description: "",
    capacity: 0,
    price: 0,
    roomServiceIds: [],
};

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
};

export default function CreateEditRoomTypeModal({
    open,
    onClose,
    onSubmit,
    initialData,
}: Props) {
    const [roomServices, setRoomServices] = useState<IRoomService[]>([]);

    const methods = useForm({
        resolver: yupResolver(UpdateSchema) as any,
        defaultValues: initialData || defaultValues,
    });

    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const fetchRoomServices = async () => {
        const response = await httpClient.roomServiceService.getRoomServiceBatch({
        ids: [],
        });
        setRoomServices(response || []);
    };

    useEffect(() => {
        fetchRoomServices();
    }, []);

    useEffect(() => {
        if (initialData) {
        reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
            {initialData ? "Edit Room Type" : "Create Room Type"}
        </DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Stack spacing={2}>
                        <Typography variant="h6">Room Type Information</Typography>

                        <RHFTextField name="roomTypeName" label="Name" />
                        <RHFTextField name="capacity" label="Capacity" />
                        <RHFTextField name="price" label="Price" />
                        <RHFTextField
                            name="description"
                            multiline
                            rows={4}
                            label="Description"
                        />
                        <RHFMultiSelect
                            variant="standard"
                            name="roomServiceIds"
                            label="Services"
                            placeholder="Select Services"
                            options={roomServices.map((item) => ({
                                label: item.roomServiceName,
                                value: item.id,
                            }))}
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
