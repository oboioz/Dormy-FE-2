import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { RHFSelect } from "../../components/hook-form/RHFSelect";
import { RHFDatePicker } from "../../components/hook-form/RHFDatePicker";
import { RoomTypeOptionModel } from "../../models/responses/RoomTypeModels";
import { formatCurrency } from "../../utils/currencyUtils";
import { useEffect, useState } from "react";
import { httpClient } from "../../services";
import { ISearchBuildingAndRoomRequestModel } from "../../models/requests/RegistrationRequestModels";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_USER } from "../../routes/paths";
import { DateTimeUtils } from "../../utils/DateTimeUtils";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import {
  InformationOfTheLatestContract,
  UserInformation,
} from "../../models/responses/ContractResponseModels";
import { fCurrency } from "../../utils/formatNumber";
import { ContractExtensionCreateRequestModel } from "../../models/requests/ContractRequestModels";
import { toast } from "react-toastify";
import { fDate } from "../../utils/formatTime";
import ContractStatusTag from "../../sections/tag/ContractStatusTag";

type FormValuesProps = {
  gender: string;
  roomTypeId: string;
  buildingId: string;
  roomId: string;
  startDate: Date | null;
  endDate: Date | null;
};

const UpdateSchema = Yup.object().shape({
  roomTypeId: Yup.string().when("$isCurrentRoomUsed", {
    is: false,
    then: (schema) => schema.required("Room type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  buildingId: Yup.string().when("$isCurrentRoomUsed", {
    is: false,
    then: (schema) => schema.required("Building is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  roomId: Yup.string().when("$isCurrentRoomUsed", {
    is: false,
    then: (schema) => schema.required("Room is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  startDate: Yup.date()
    .nullable()
    .required("Start date is required")
    .min(new Date(), "Start date cannot be in the past"),
  endDate: Yup.date()
    .nullable()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after the start date"),
});

export default function ContractExtensionCreatePage() {
  useAuthGuard(UserRole.CUSTOMER);
  const navigate = useNavigate();
  const { contractId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentRoomUsed, setIsCurrentRoomUsed] = useState<boolean>(true);
  const [contractInformation, setContractInformation] =
    useState<InformationOfTheLatestContract | null>(null);
  const [userInformation, setUserInformation] =
    useState<UserInformation | null>(null);
  const [roomTypeOptions, setRoomTypeOptions] = useState<RoomTypeOptionModel[]>(
    []
  );
  const [buildings, setBuildings] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [isDisabledBuidlingOption, setIsDisabledBuidlingOption] =
    useState<boolean>(true);
  const [isDisabledRoomOption, setIsDisabledRoomOption] =
    useState<boolean>(true);

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateSchema) as any,
    context: { isCurrentRoomUsed },
  });

  const { watch, reset, control, setValue, handleSubmit } = methods;

  const gender = userInformation?.gender; //watch("gender"); // Watch for changes in gender
  const roomTypeId = watch("roomTypeId"); // Watch for changes in roomTypeId
  const buildingId = watch("buildingId"); // Watch for changes in buildingId

  const onSubmit = async (data: FormValuesProps) => {
    setIsLoading(true);

    const payload: ContractExtensionCreateRequestModel = {
      startDate: DateTimeUtils.toStringWithDefaultTime(data.startDate),
      endDate: DateTimeUtils.toStringWithDefaultTime(data.endDate),
      roomId: isCurrentRoomUsed ? contractInformation?.roomId : data.roomId,
      contractId: contractId || "",
    };

    const response = await httpClient.contractService.createContractExtension(
      payload
    );
    if (response) {
      toast.success("Extend contract successfully!");
      navigate(PATH_USER.contract);
    }
    setIsLoading(false);
  };

  const getInitialExtendContractData = async (contractId: string) => {
    const response =
      await httpClient.contractService.getInitialExtendContractData(contractId);
    if (response) {
      setRoomTypeOptions(response.listRoomTypes);
      setContractInformation(response.contractInformation);
      setUserInformation(response.userInformation);
    }
  };

  useEffect(() => {
    setValue("gender", userInformation?.gender);
    getInitialExtendContractData(contractId);
  }, [isCurrentRoomUsed, contractId]);

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

  const handleChangeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCurrentRoomUsed(event.target.checked);
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 2 }}
        align="center"
      >
        Extend for contract
      </Typography>
      <Box
        key={contractInformation?.contractId}
        sx={{
          ml: 14,
          mr: 14,
          mb: 2,
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Contract period:</strong>{" "}
              {fDate(contractInformation?.startDate, "dd/MM/yyyy")}
              {" - "}
              {fDate(contractInformation?.endDate, "dd/MM/yyyy")}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Room Number: </strong>
              {contractInformation?.roomNumber}
              {" - "}
              <strong>Building: </strong>
              {contractInformation?.buildingName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <b>Status:</b>{" "}
              <ContractStatusTag status={contractInformation?.status} />
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Room Type: </strong>
              {contractInformation?.roomTypeName}
            </Typography>
          </Grid>
        </Grid>
      </Box>
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
                    minDate={
                      contractInformation?.endDate
                        ? (() => {
                            const base = new Date(
                              Math.max(
                                new Date().getTime(),
                                new Date(contractInformation.endDate).getTime()
                              )
                            );
                            base.setDate(base.getDate() + 1);
                            return base;
                          })()
                        : new Date()
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFDatePicker
                    name="endDate"
                    label="End date"
                    minDate={watch("startDate") || new Date()}
                  />
                </Grid>
              </Grid>
            </Stack>
            <Stack
              spacing={2}
              style={{ paddingTop: "16px", alignItems: "center" }}
            >
              <Typography variant="h6">
                You still want to accommodate the current room?{" "}
                <Switch
                  checked={isCurrentRoomUsed}
                  onChange={handleChangeToggle}
                  color="primary"
                  size="medium"
                />
              </Typography>
            </Stack>

            {isCurrentRoomUsed ? (
              <Stack spacing={2}>
                <Typography variant="h6">
                  The current room information:
                </Typography>
                <Typography sx={{ pl: 4 }}>
                  <strong>Room number:</strong>{" "}
                  {contractInformation?.roomNumber}
                  {" - "}
                  <strong>Building:</strong> {contractInformation?.buildingName}
                </Typography>
                <Typography sx={{ pl: 4 }}>
                  <strong>Room type:</strong>{" "}
                  {contractInformation?.roomTypeName}
                </Typography>
                <Typography sx={{ pl: 4 }}>
                  <strong>Price:</strong>{" "}
                  {fCurrency(contractInformation?.price)}
                </Typography>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Typography variant="h6">Choose room</Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <RHFTextField
                      name="gender"
                      label="Gender"
                      InputProps={{
                        readOnly: true, // Make the input read-only
                      }}
                    />
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
            )}
          </Grid>

          <Container
            sx={{
              pt: 4,
            }}
          >
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                size="large"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Extend contract"}{" "}
              </Button>
            </Stack>
          </Container>
        </Grid>
      </FormProvider>
    </>
  );
}
