// @mui
import {
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

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
  IRoomService,
  IRoomServiceCreate,
  RoomServiceEnum,
} from "../../../../models/responses/RoomServiceModels";
import { RHFCheckbox } from "../../../../components/hook-form/RHFCheckbox";
import { toast } from "react-toastify";
import { RHFSelect } from "../../../../components/hook-form/RHFSelect";
import { useEffect, useState } from "react";
// import { httpClient } from "../../../../utils/axios";
import { httpClient } from "../../../../services";

const UpdateSchema = Yup.object().shape({
  roomServiceName: Yup.string().required("Name is required!"),
  unit: Yup.string().required("Unit is required!"),
  cost: Yup.number()
    .required("Price is required!")
    .min(0, "Mininum value is >= 0"),
  roomServiceType: Yup.string().required("Type is required!"),
  isServiceIndicatorUsed: Yup.boolean(),
});

const defaultValues: IRoomServiceCreate = {
  roomServiceName: "",
  unit: "",
  cost: 0,
  roomServiceType: "",
  isServiceIndicatorUsed: true,
};

export default function RoomServiceForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [roomServiceEnums, setRoomServiceEnums] = useState<RoomServiceEnum[]>(
    []
  );

  const methods = useForm<IRoomServiceCreate>({
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

  const createRoomService = async (data: IRoomServiceCreate) => {
    var response = await httpClient.roomServiceService.createRoomServiceBatch([data]);
    if (response && response?.length > 0) {
      toast.success("Create room service successfully");
      navigate(PATH_ADMIN.dormitory.roomService);
    } else {
      toast.error("An error has occurred, please try again later");
    }
  };

  const updateRoomService = async (data: IRoomServiceCreate) => {
    var response = await httpClient.roomServiceService.updateRoomServiceBatch({
      ...data,
      id: id || "",
    });

    if (response) {
      toast.success("Update room service successfully");
      navigate(PATH_ADMIN.dormitory.roomService);
    } else {
      toast.error("An error has occurred, please try again later");
    }
  };

  const onSubmit = async (data: IRoomServiceCreate) => {
    if (id) {
      updateRoomService(data);
    } else {
      createRoomService(data);
    }
  };

  const fetchRoomServiceEnums = async () => {
    var response = await httpClient.roomServiceService.getRoomServiceEnums();
    setRoomServiceEnums(response || []);
  };

  const setInitData = (data: IRoomService) => {
    setValue("roomServiceName", data.roomServiceName);
    setValue("unit", data.unit);
    setValue("cost", data.cost);
    setValue("roomServiceType", data.roomServiceType);
    setValue("isServiceIndicatorUsed", data.isServiceIndicatorUsed);
  };

  const getRoomServiceDetail = async (id: string) => {
    var response = await httpClient.roomServiceService.getRoomServiceBatch({
      ids: [id],
    });

    if (response && response.length > 0) {
      setInitData(response[0]);
    } else {
      navigate(PATH_ADMIN.dormitory.roomServiceForm);
    }
  };

  useEffect(() => {
    fetchRoomServiceEnums();
  }, []);

  useEffect(() => {
    if (id) {
      getRoomServiceDetail(id);
    }
  }, [id]);

  console.log(roomServiceEnums);

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 }}>
        Room Service
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
              <Typography variant="h6">Information of Room Service</Typography>
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
                {roomServiceEnums.map((item) => {
                  return (
                    <MenuItem key={item.enumValue} value={item.enumValue}>
                      {item.englishEnumDescription}
                    </MenuItem>
                  );
                })}
              </RHFSelect>
              <RHFCheckbox
                name="isServiceIndicatorUsed"
                label="Indicator used?"
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
                to={PATH_ADMIN.dormitory.roomService}
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
