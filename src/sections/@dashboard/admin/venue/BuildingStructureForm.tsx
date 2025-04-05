import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFieldArray, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import FormProvider, { RHFTextField } from "../../../../components/hook-form";
import { RHFSelect } from "../../../../components/hook-form/RHFSelect";
import Iconify from "../../../../components/iconify";
import { PATH_ADMIN, PATH_PAGE } from "../../../../routes/paths";
import { httpClient } from "../../../../services";
import { IRoomType } from "../../../../models/responses/RoomTypeModels";
import { toast } from "react-toastify";
import { BuildingCreateModel } from "../../../../models/responses/BuildingModels";

type FormValuesProps = {
  genderRestriction: string;
  name: string;
  totalFloor: number;
  rooms: {
    roomTypeId: string;
    floorNumber: number;
    totalRoomsWantToCreate: number;
  }[];
};

export default function BuildingStructureForm() {
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const fetchRoomTypes = async () => {
    const response = await httpClient.roomTypeService.getRoomTypeBatch();
    if (response) {
      setRoomTypes(response);
    }
  };

  const createBuilding = async (payload: BuildingCreateModel) => {
    const isCreatedSuccess = await httpClient.buildingService.createBuilding(
      payload
    );
    if (isCreatedSuccess) {
      toast.success("Create building success");
      navigate(PATH_ADMIN.dormitory.buildings);
    } else {
      toast.error("An error has occurred, please try again");
      reset();
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const methods = useForm<FormValuesProps>({
    defaultValues: {
      genderRestriction: "MALE",
      name: "Building A",
      totalFloor: 1,
      rooms: [],
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const {
    fields: floors,
    append: addFloor,
    remove: removeFloor,
  } = useFieldArray({
    control,
    name: "rooms", // Treat each floor as a "room" group
  });

  const validateForm = (data: FormValuesProps) => {
    const errors: Record<string, string> = {};

    if (!data.genderRestriction) {
      errors.genderRestriction = "Gender restriction is required.";
    }
    if (!data.name) {
      errors.name = "Building name is required.";
    }
    if (data.totalFloor < 1) {
      errors.totalFloor = "Total floors must be at least 1.";
      toast.error("At least one floor is required.");
    }
    if (data.rooms.length === 0) {
      errors.rooms = "At least one floor is required.";
      toast.error("At least one floor is required.");
    }

    data.rooms.forEach((floor, floorIndex) => {
      if (
        floor.roomTypeId === "" ||
        floor.roomTypeId === undefined ||
        !roomTypes.some((t) => t.id === floor.roomTypeId)
      ) {
        errors[`rooms.${floorIndex}.roomTypeId`] = "Room type is required.";
      }
      if (floor.totalRoomsWantToCreate < 1) {
        errors[`rooms.${floorIndex}.totalRoomsWantToCreate`] =
          "Room count must be at least 1.";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (data: FormValuesProps) => {
    if (!validateForm(data)) {
      return;
    }

    // Map floors to create building payload
    const payload: BuildingCreateModel = {
      name: data.name,
      totalFloors: data.rooms.length, // Rename totalFloor to totalFloors
      genderRestriction: data.genderRestriction,
      rooms: data.rooms.map((floor) => ({
        roomTypeId: floor.roomTypeId,
        floorNumber: floor.floorNumber, // Keep floorNumber as is
        totalRoomsWantToCreate: floor.totalRoomsWantToCreate,
      })),
    };

    await createBuilding(payload);
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 }}>
        Create Building
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={5}
          alignContent="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={10}>
            <Stack spacing={2}>
              <Typography variant="h6">Building Information</Typography>

              <RHFSelect name="genderRestriction" label="Gender Restriction">
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">None</MenuItem>
              </RHFSelect>
              {formErrors.genderRestriction && (
                <Typography color="error">
                  {formErrors.genderRestriction}
                </Typography>
              )}

              <RHFTextField name="name" label="Building Name" />
              {formErrors.name && (
                <Typography color="error">{formErrors.name}</Typography>
              )}

              <Typography variant="h6">Floors</Typography>
              {floors.map((floor, index) => (
                <Card key={floor.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Stack spacing={2}>
                    <Typography variant="subtitle1">
                      Floor {index + 1}
                    </Typography>

                    <RHFSelect
                      name={`rooms.${index}.roomTypeId`}
                      label="Room Type"
                    >
                      {roomTypes.map((roomType) => (
                        <MenuItem key={roomType.id} value={roomType.id}>
                          {roomType.roomTypeName}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                    {formErrors[`rooms.${index}.roomTypeId`] && (
                      <Typography color="error" variant="caption">
                        {formErrors[`rooms.${index}.roomTypeId`]}
                      </Typography>
                    )}

                    <RHFTextField
                      name={`rooms.${index}.totalRoomsWantToCreate`}
                      label="Room Count"
                      type="number"
                    />
                    {formErrors[`rooms.${index}.totalRoomsWantToCreate`] && (
                      <Typography color="error" variant="caption">
                        {formErrors[`rooms.${index}.totalRoomsWantToCreate`]}
                      </Typography>
                    )}

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeFloor(index)}
                    >
                      Remove Floor
                    </Button>
                  </Stack>
                </Card>
              ))}
              <Button
                variant="outlined"
                onClick={() =>
                  addFloor({
                    roomTypeId: "",
                    floorNumber: floors.length + 1,
                    totalRoomsWantToCreate: 1,
                  })
                }
              >
                Add Floor
              </Button>
            </Stack>
          </Grid>

          <Container sx={{ pt: 15 }}>
            <Stack spacing={3} direction="row" justifyContent="space-between">
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to={PATH_ADMIN.dormitory.buildings}
              >
                Back to Building
              </Button>

              <LoadingButton
                variant="contained"
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                size="large"
                type="submit"
                loading={isSubmitting}
              >
                Confirm
              </LoadingButton>
            </Stack>
          </Container>
        </Grid>
      </FormProvider>
    </>
  );
}
