// @mui
import {
  Button,
  Container,
  Divider,
  FormHelperText,
  Grid,
  MenuItem,
  Stack,
  StackProps,
  Typography,
} from "@mui/material";
// @types
// _mock
// components
//
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { IRegistrationFormState, IUser } from "../../@types/user";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import RHFCodes from "../../components/hook-form/RHFCodes";
import { RHFSelect } from "../../components/hook-form/RHFSelect";
import Iconify from "../../components/iconify";
import { RHFDatePicker } from "../../components/hook-form/RHFDatePicker";
import { IEnumModel } from "../../models/responses/EnumModels";
import { RoomTypeOptionModel } from "../../models/responses/RoomTypeModels";
import { formatCurrency } from "../../utils/currencyUtils";
import { useEffect, useState } from "react";
import { httpClient } from "../../services";
import { ISearchBuildingAndRoomRequestModel } from "../../models/requests/RegistrationRequestModels";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";
import { useDispatch } from "../../redux/store";
import { updateGeneralInformation } from "../../redux/slices/registration";
import { DateTimeUtils } from "../../utils/DateTimeUtils";

type Props = {
  generalInformation: IRegistrationFormState;
  genderEnums: IEnumModel[];
  roomTypeOptions: RoomTypeOptionModel[];
  onNextStep: VoidFunction;
  onBackStep: VoidFunction;
};

type FormValuesProps = {
  gender: string;
  roomTypeId: string;
  buildingId: string;
  roomId: string;
  startDate: Date | null;
  endDate: Date | null;
};

const UpdateSchema = Yup.object().shape({
  gender: Yup.string().required("Gender is required"),
  roomTypeId: Yup.string().required("Room type is required"),
  buildingId: Yup.string().required("Building is required"),
  roomId: Yup.string().required("Room is required"),
  startDate: Yup.date()
    .nullable()
    .required("Start date is required")
    .min(new Date(), "Start date cannot be in the past"),
  endDate: Yup.date()
    .nullable()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after the start date"),
});

export default function RoomPickingForm({
  generalInformation,
  genderEnums,
  roomTypeOptions,
  onNextStep,
  onBackStep,
}: Props) {
  // const { medical } = generalInformation.healthInsurance

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [buildings, setBuildings] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [isDisabledBuidlingOption, setIsDisabledBuidlingOption] =
    useState<boolean>(true);
  const [isDisabledRoomOption, setIsDisabledRoomOption] =
    useState<boolean>(true);

  const defaultValues: FormValuesProps = {
    roomTypeId: generalInformation?.roomState?.roomTypeId,
    buildingId: generalInformation?.roomState?.buildingId,
    gender: generalInformation?.roomState?.gender,
    roomId: generalInformation?.roomState?.roomId,
    startDate: generalInformation?.startDate,
    endDate: generalInformation?.endDate,
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateSchema) as any,
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    // formState: { isSubmitting, errors },
  } = methods;

  const gender = watch("gender"); // Watch for changes in gender
  const roomTypeId = watch("roomTypeId"); // Watch for changes in roomTypeId
  const buildingId = watch("buildingId"); // Watch for changes in buildingId

  const onSubmit = async (data: FormValuesProps) => {
    setIsLoading(true);
    const dataPayload: IRegistrationFormState = {
      userState: generalInformation.userState,
      healthInsuranceState: generalInformation.healthInsuranceState,
      guardianState: generalInformation.guardianState,
      workplaceId: generalInformation.workplaceId,
      roomState: {
        buildingId: data.buildingId,
        roomId: data.roomId,
        roomTypeId: data.roomTypeId,
        gender: data.gender,
      },
      startDate: data.startDate,
      endDate: data.endDate,
    };

    dispatch(updateGeneralInformation(dataPayload));

    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("DATA", data);
    // reset();

    setIsLoading(false);
    onNextStep();
  };

  const searchBuildingsAndRoomsByGenderAndRoomType = async (
    payload: ISearchBuildingAndRoomRequestModel
  ) => {
    var response =
      await httpClient.registrationService.searchBuildingsAndRoomsByGenderAndRoomType(
        payload
      );
    if (response) {
      setBuildings(response);
      setIsDisabledBuidlingOption(false);
    }
  };

  useEffect(() => {
    // console.log("gender: ", gender);
    // console.log("roomTypeId: ", roomTypeId);
    setValue("buildingId", "");
    setValue("roomId", "");
    if (gender && roomTypeId) {
      searchBuildingsAndRoomsByGenderAndRoomType({
        roomTypeId: roomTypeId,
        gender: gender,
      });
    }
  }, [gender, roomTypeId]);

  useEffect(() => {
    if (buildingId) {
      const selectedBuilding = buildings.find(
        (building) => building.buildingId === buildingId
      );
      if (selectedBuilding) {
        setRooms(selectedBuilding.listRooms);
        setIsDisabledRoomOption(false);
      } else {
        setRooms([]);
        setIsDisabledRoomOption(false);
      }
    } else {
      setRooms([]);
      setIsDisabledRoomOption(true);
    }
  }, [buildingId]);

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 }}>
        Choose a room that suits your preference
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
              <Typography variant="h6">
                Choose start date and end date for contract
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <RHFDatePicker
                    name="startDate"
                    label="Start date"
                    minDate={new Date()}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFDatePicker
                    name="endDate"
                    label="End date"
                    minDate={new Date()}
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack spacing={2} sx={{ pt: 5 }}>
              <Typography variant="h6">Choose room</Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <RHFSelect name="gender" label="Gender">
                    {/* <MenuItem value="">None</MenuItem>
                    <Divider sx={{ borderStyle: "dashed" }} /> */}
                    {genderEnums?.map((option) => (
                      <MenuItem key={option.enumValue} value={option.enumValue}>
                        {option.vietnameseEnumDescription +
                          " (" +
                          option.englishEnumDescription +
                          ")"}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
                <Grid item xs={12} md={9}>
                  <RHFSelect
                    name="roomTypeId"
                    label="Room type"
                    // value={roomTypeId}
                  >
                    {roomTypeOptions?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.roomTypeName +
                          " - Capacity: " +
                          option.capacity +
                          " - Price: " +
                          formatCurrency(option.price)}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <RHFSelect
                    name="buildingId"
                    label="Building"
                    // value={buildingId}
                    disabled={isDisabledBuidlingOption}
                  >
                    {buildings?.length > 0 ? (
                      buildings.map((option) => (
                        <MenuItem
                          key={option.buildingId}
                          value={option.buildingId}
                        >
                          {option.buildingName}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled value="">
                        No building available with your choice. Please choose
                        other room types.
                      </MenuItem>
                    )}
                  </RHFSelect>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <RHFSelect
                    name="roomId"
                    label="Room"
                    // value={buildingId}
                    disabled={isDisabledRoomOption}
                  >
                    {rooms?.length > 0 ? (
                      rooms?.map((option) => (
                        <MenuItem key={option.roomId} value={option.roomId}>
                          {option.roomNumber +
                            " - Status: " +
                            option.status +
                            " - Used bed: " +
                            option.totalUsedBed +
                            "/" +
                            option.totalAvailableBed}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled value="">
                        No room available with your choice.
                      </MenuItem>
                    )}
                  </RHFSelect>
                </Grid>
              </Grid>
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
                onClick={() => navigate(PATH_AUTH.login)} // Change this based on your path
                size="large"
              >
                Back to login page
              </Button>

              {/* Next Step Button */}
              <Button
                variant="contained"
                endIcon={
                  !isLoading ? (
                    <Iconify icon="eva:arrow-ios-forward-fill" />
                  ) : null
                }
                // onClick={onNextStep} // Change this based on your path
                onClick={handleSubmit(onSubmit)}
                size="large"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Next Step"}{" "}
              </Button>
            </Stack>
          </Container>
        </Grid>
      </FormProvider>
    </>
  );
}
