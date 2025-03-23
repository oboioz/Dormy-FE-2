// @mui
import { Button, Container, Grid, Stack, Typography } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import * as Yup from "yup";
import FormProvider, { RHFTextField } from "../../../../components/hook-form";
import Iconify from "../../../../components/iconify";
import { PATH_ADMIN } from "../../../../routes/paths";
import {
  IRoomType,
  IRoomTypeCreate,
} from "../../../../models/responses/RoomTypeModels";
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

const defaultValues: IRoomTypeCreate = {
  roomTypeName: "",
  description: "",
  capacity: 0,
  price: 0,
  roomServiceIds: [],
};

export default function RoomTypeForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [roomServices, setRoomServices] = useState<IRoomService[]>([]);

  const methods = useForm<IRoomTypeCreate>({
    resolver: yupResolver(UpdateSchema) as any,
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const createRoomType = async (data: IRoomTypeCreate) => {
    var response = await httpClient.roomTypeService.createRoomType(data);
    if (response) {
      toast.success("Create room service successfully");
      navigate(PATH_ADMIN.dormitory.roomType);
    } else {
      toast.error("An error has occurred, please try again later");
    }
  };

  const updateRoomType = async (data: IRoomTypeCreate) => {
    var response = await httpClient.roomTypeService.updateRoomType({
      ...data,
      id: id || "",
    });

    if (response) {
      toast.success("Update room service successfully");
      navigate(PATH_ADMIN.dormitory.roomType);
    } else {
      toast.error("An error has occurred, please try again later");
    }
  };

  const onSubmit = async (data: IRoomTypeCreate) => {
    if (id) {
      updateRoomType(data);
    } else {
      createRoomType(data);
    }
  };

  const setInitData = (data: IRoomType) => {
    setValue("roomTypeName", data.roomTypeName);
    setValue("capacity", data.capacity);
    setValue("price", data.price);
    setValue("description", data.description);
    setValue(
      "roomServiceIds",
      data.roomServices.map((x) => x.id)
    );
  };

  const getRoomTypeDetail = async (id: string) => {
    var response = await httpClient.roomTypeService.getRoomTypeById(id);

    if (response) {
      setInitData(response);
    } else {
      navigate(PATH_ADMIN.dormitory.roomServiceForm);
    }
  };

  const fetchRoomServices = async () => {
    var response = await httpClient.roomServiceService.getRoomServiceBatch({
      ids: [],
    });
    setRoomServices(response || []);
  };

  useEffect(() => {
    if (id) {
      getRoomTypeDetail(id);
    }
  }, []);

  useEffect(() => {
    fetchRoomServices();
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 }}>
        Room Type
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={5}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={12} md={10}>
            <Stack spacing={2}>
              <Typography variant="h6">Information of Room Type</Typography>

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
                placeholder="Electricity"
                options={roomServices.map((item) => ({
                  label: item.roomServiceName,
                  value: item.id,
                }))}
              />
            </Stack>
          </Grid>

          <Container
            sx={{
              pt: 15,
            }}
          >
            <Stack spacing={3} direction="row" justifyContent="space-between">
              <Button
                variant="outlined"
                size="large"
                component={RouterLink} // Use RouterLink for navigation
                to={PATH_ADMIN.dormitory.roomType}
              >
                Back Step
              </Button>

              {/* Next Step Button */}
              <LoadingButton
                variant="contained"
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                size="large"
                type="submit"
                loading={isSubmitting}
              >
                Next Step
              </LoadingButton>
            </Stack>
          </Container>
        </Grid>
      </FormProvider>
    </>
  );
}
