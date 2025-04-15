import {
    Button,
    Grid,
    MenuItem,
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
import { RHFCheckbox } from "../../../../components/hook-form/RHFCheckbox";
import { RHFSelect } from "../../../../components/hook-form/RHFSelect";
import { useEffect, useState } from "react";
import {
    IRoomService,
    IRoomServiceCreate,
    RoomServiceEnum,
} from "../../../../models/responses/RoomServiceModels";
import { httpClient } from "../../../../services";
import { toast } from "react-toastify";

const UpdateSchema = Yup.object().shape({
    roomServiceName: Yup.string().required("Name is required!"),
    unit: Yup.string().required("Unit is required!"),
    cost: Yup.number()
        .required("Price is required!")
        .min(0, "Minimum value is >= 0"),
    roomServiceType: Yup.string().required("Type is required!"),
    isServiceIndicatorUsed: Yup.boolean(),
});

const defaultValues: IRoomServiceCreate = {
    roomServiceName: "",
    unit: "",
    cost: 0,
    roomServiceType: "",
    isServiceIndicatorUsed: false,
};

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: IRoomServiceCreate) => void;
    initialData?: IRoomService | null;
};

export default function CreateEditRoomServiceModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
    const [roomServiceEnums, setRoomServiceEnums] = useState<RoomServiceEnum[]>([]);

    const methods = useForm<IRoomServiceCreate>({
        resolver: yupResolver(UpdateSchema) as any,
        defaultValues: initialData || defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const fetchRoomServiceEnums = async () => {
        const response = await httpClient.roomServiceService.getRoomServiceEnums();
        setRoomServiceEnums(response || []);
    };

    useEffect(() => {
        fetchRoomServiceEnums();
    }, []);

    useEffect(() => {
        if (initialData) {
        reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
            {initialData ? "Edit Room Service" : "Create Room Service"}
        </DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <DialogContent dividers>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Stack spacing={2}>
                    <Typography variant="h6">Room Service Information</Typography>
                    <RHFTextField
                    name="roomServiceName"
                    label="Name"
                    placeholder="Electricity"
                    />
                    <RHFTextField name="unit" label="Unit" placeholder="Kw/h" />
                    <RHFTextField name="cost" label="Price" placeholder="3500" />
                    <RHFSelect
                        variant="standard"
                        name="roomServiceType"
                        label="Type"
                        placeholder="ELECTRICITY"
                    >
                        {roomServiceEnums.map((item) => (
                            <MenuItem key={item.enumValue} value={item.enumValue}>
                            {item.englishEnumDescription}
                            </MenuItem>
                        ))}
                    </RHFSelect>
                    <RHFCheckbox
                    name="isServiceIndicatorUsed"
                    label="Indicator used?"
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
