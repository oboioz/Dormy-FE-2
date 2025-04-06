import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PATH_ADMIN } from "../../../../routes/paths";
import { httpClient } from "../../../../services";
import { IRoomType } from "../../../../models/responses/RoomTypeModels";
import { toast } from "react-toastify";
import {
  BuildingCreateModel,
  BuildingEditModel,
  BuildingModel,
} from "../../../../models/responses/BuildingModels";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../../../components/iconify";
import { set } from "lodash";

type FormRoomTypeCreate = {
  roomTypeId: string;
  totalRoomsWantToCreate: number;
};

type FormFloorCreate = {
  floorNumber: number;
  roomTypes: FormRoomTypeCreate[];
};

type FormValuesProps = {
  genderRestriction: string;
  name: string;
  totalFloor: number;
  floors: FormFloorCreate[];
};

export default function BuildingStructureForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const isEditMode = Boolean(id);

  const defaultBuilding: FormValuesProps = {
    genderRestriction: "MALE",
    name: "Building A",
    totalFloor: 0,
    floors: [
      {
        floorNumber: 1,
        roomTypes: [],
      },
    ],
  };
  const [building, setBuilding] = useState<FormValuesProps>(defaultBuilding);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRoomTypes = async () => {
    const response = await httpClient.roomTypeService.getRoomTypeBatch();
    if (response) {
      setRoomTypes(response);
    }
  };

  const createBuilding = async (payload: BuildingCreateModel) => {
    setIsSubmitting(true);
    const isCreatedSuccess = await httpClient.buildingService.createBuilding(
      payload
    );
    if (isCreatedSuccess) {
      toast.success("Building created successfully!");
      navigate(PATH_ADMIN.dormitory.buildings);
      setIsSubmitting(false);
    } else {
      toast.error("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const editBuilding = async (payload: BuildingEditModel) => {
    setIsSubmitting(true);
    const isEditedSuccess = await httpClient.buildingService.updateBuilding(
      payload
    );
    if (isEditedSuccess) {
      toast.success("Building updated successfully!");
      navigate(PATH_ADMIN.dormitory.buildings);
      setIsSubmitting(false);
    } else {
      toast.error("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const validateForm = (data: FormValuesProps) => {
    const errors: Record<string, string> = {};

    if (!data.genderRestriction) {
      errors.genderRestriction = "Gender restriction is required.";
    }
    if (!data.name) {
      errors.name = "Building name is required.";
    }
    if (data.floors.length === 0) {
      errors.floors = "At least one floor is required.";
      toast.error("At least one floor is required.");
    }

    data.floors.forEach((floor, floorIndex) => {
      if (!floor.roomTypes || floor.roomTypes.length === 0) {
        errors[`floors.${floorIndex}.roomTypes`] =
          "At least one room type is required for this floor.";
        toast.error(
          `Floor ${floorIndex + 1}: At least one room type is required.`
        );
      }

      floor.roomTypes.forEach((roomType, roomTypeIndex) => {
        if (!roomType.roomTypeId) {
          errors[`floors.${floorIndex}.roomTypes.${roomTypeIndex}.roomTypeId`] =
            "Room type is required.";
        }
        if (
          !roomType.totalRoomsWantToCreate ||
          roomType.totalRoomsWantToCreate < 1
        ) {
          errors[
            `floors.${floorIndex}.roomTypes.${roomTypeIndex}.totalRoomsWantToCreate`
          ] = "Room count must be at least 1.";
        }
      });
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (data: FormValuesProps) => {
    if (!validateForm(data)) {
      return;
    }

    if (isEditMode) {
      if (id) {
        await editBuilding({
          id: id,
          name: data.name,
          totalFloors: data.floors.length,
          genderRestriction: data.genderRestriction,
        });
      }
    } else {
      const payload: BuildingCreateModel = {
        name: data.name,
        totalFloors: data.floors.length,
        genderRestriction: data.genderRestriction,
        rooms: data.floors.flatMap((floor) =>
          floor.roomTypes.map((roomType) => ({
            roomTypeId: roomType.roomTypeId,
            floorNumber: floor.floorNumber,
            totalRoomsWantToCreate: roomType.totalRoomsWantToCreate,
          }))
        ),
      };

      await createBuilding(payload);
    }
  };

  const handleChangeGenderRestriction = (event: SelectChangeEvent<string>) => {
    setBuilding({ ...building, genderRestriction: event.target.value });
  };

  const handleChangeBuildingName = (event: ChangeEvent<HTMLInputElement>) => {
    setBuilding({ ...building, name: event.target.value });
  };

  const handleChangeRoomType = (
    event: SelectChangeEvent<string>,
    floorIndex: number,
    roomTypeIndex: number
  ) => {
    setBuilding({
      ...building,
      floors: building.floors.map((floor, index) =>
        index === floorIndex
          ? {
              ...floor,
              roomTypes: floor.roomTypes.map((roomType, index) =>
                index === roomTypeIndex
                  ? {
                      ...roomType,
                      roomTypeId: event.target.value,
                      totalRoomsWantToCreate:
                        roomTypes.find((x) => x.id === event.target.value)
                          ?.capacity || 1,
                    }
                  : roomType
              ),
            }
          : floor
      ),
    });
  };

  const handleRemoveRoomType = (floorIndex: number, roomTypeIndex: number) => {
    setBuilding({
      ...building,
      floors: building.floors.map((floor, index) =>
        index === floorIndex
          ? {
              ...floor,
              roomTypes: floor.roomTypes.filter(
                (_, index) => index !== roomTypeIndex
              ),
            }
          : floor
      ),
    });
  };

  const handleAddRoomType = (floorIndex: number) => {
    setBuilding({
      ...building,
      floors: building.floors.map((floor, index) =>
        index === floorIndex
          ? {
              ...floor,
              roomTypes: [
                ...floor.roomTypes,
                {
                  roomTypeId: "",
                  totalRoomsWantToCreate: 0,
                },
              ],
            }
          : floor
      ),
    });
  };

  const handleRemoveFloor = (floorIndex: number) => {
    setBuilding({
      ...building,
      floors: building.floors.filter((_, index) => index !== floorIndex),
    });
  };

  const handleAddFloor = () => {
    setBuilding({
      ...building,
      floors: [
        ...building.floors,
        {
          floorNumber: building.floors.length + 1,
          roomTypes: [],
        },
      ],
    });
  };

  const fetchBuildingById = async (id: string) => {
    var response = await httpClient.buildingService.getBuildingById(id);
    if (response) {
      setBuilding(mapBuildingModelToFormValues(response));
    }
  };

  const mapBuildingModelToFormValues = (
    buildingModel: BuildingModel
  ): FormValuesProps => {
    const floorsMap: Record<number, FormFloorCreate> = {};

    // Group rooms by floorNumber and map them to FormFloorCreate
    buildingModel.rooms.forEach((room) => {
      if (!floorsMap[room.floorNumber]) {
        floorsMap[room.floorNumber] = {
          floorNumber: room.floorNumber,
          roomTypes: [],
        };
      }

      // Add roomType to the corresponding floor
      floorsMap[room.floorNumber].roomTypes.push({
        roomTypeId: room.roomTypeId,
        totalRoomsWantToCreate: room.totalAvailableBed + room.totalUsedBed, // Assuming total rooms = available + used beds
      });
    });

    // Convert floorsMap to an array of FormFloorCreate
    const floors = Object.values(floorsMap);

    return {
      genderRestriction: buildingModel.genderRestriction,
      name: buildingModel.name,
      totalFloor: buildingModel.totalFloors,
      floors,
    };
  };

  useEffect(() => {
    if (isEditMode && id) {
      fetchBuildingById(id);
    }
  }, [id]);

  return (
    <Stack spacing={4} sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {isEditMode ? "Edit Building" : "Create New Building"}
      </Typography>

      {/* Building Information */}
      <Card sx={{ padding: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h6">Building Information</Typography>
          <FormControl>
            <InputLabel id="genderRestriction-label">
              Gender Restriction
            </InputLabel>
            <Select
              id="genderRestriction"
              labelId="genderRestriction-label"
              value={building.genderRestriction}
              disabled={isEditMode}
              label="Gender Restriction"
              onChange={handleChangeGenderRestriction}
              fullWidth
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="buildingName"
            value={building.name}
            label="Building Name"
            onChange={handleChangeBuildingName}
            fullWidth
            required
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
        </Stack>
      </Card>

      {/* Floors */}
      <Stack spacing={3}>
        <Typography variant="h6">Floors</Typography>
        <Grid container spacing={3}>
          {building.floors.map((floor, floorIndex) => (
            <Grid item xs={12} sm={12} md={6} key={floorIndex}>
              <Card sx={{ padding: 3 }}>
                <Stack spacing={2}>
                  <Grid
                    container
                    spacing={2}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">
                        Floor {floorIndex + 1}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      {building.floors?.length > 1 && (
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<Iconify icon="eva:trash-2-outline" />}
                          onClick={() => handleRemoveFloor(floorIndex)}
                          disabled={isEditMode}
                        >
                          Remove Floor
                        </Button>
                      )}
                    </Grid>
                  </Grid>

                  {floor.roomTypes.map((roomType, roomTypeIndex) => (
                    <Card key={roomTypeIndex} sx={{ padding: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <FormControl
                            disabled={isEditMode}
                            required
                            error={
                              !!formErrors[
                                `floors.${floorIndex}.roomTypes.${roomTypeIndex}.roomTypeId`
                              ]
                            }
                            fullWidth
                          >
                            <InputLabel
                              id={`roomTypeId-${floorIndex}-${roomTypeIndex}`}
                            >
                              Room Type
                            </InputLabel>
                            <Select
                              id={`roomTypeId-${floorIndex}-${roomTypeIndex}`}
                              labelId={`roomTypeId-${floorIndex}-${roomTypeIndex}`}
                              label="Room Type"
                              value={roomType.roomTypeId}
                              onChange={(event) =>
                                handleChangeRoomType(
                                  event,
                                  floorIndex,
                                  roomTypeIndex
                                )
                              }
                            >
                              {roomTypes.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                  {type.roomTypeName}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {
                                formErrors[
                                  `floors.${floorIndex}.roomTypes.${roomTypeIndex}.roomTypeId`
                                ]
                              }
                            </FormHelperText>
                          </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                            id={`totalRoomsWantToCreate-${floorIndex}-${roomTypeIndex}`}
                            label="Room Count"
                            type="number"
                            value={roomType.totalRoomsWantToCreate}
                            disabled
                            fullWidth
                          />
                        </Grid>

                        {/* Remove Room Type Button on the second row */}
                        {floor.roomTypes?.length > 1 && (
                          <Grid item xs={12} sx={{ textAlign: "right" }}>
                            <Button
                              variant="outlined"
                              disabled={isEditMode}
                              color="error"
                              onClick={() =>
                                handleRemoveRoomType(floorIndex, roomTypeIndex)
                              }
                            >
                              Remove Room Type
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Card>
                  ))}
                  <Button
                    variant="outlined"
                    disabled={isEditMode}
                    onClick={() => handleAddRoomType(floorIndex)}
                  >
                    Add Room Type
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="outlined"
          disabled={isEditMode}
          onClick={() => handleAddFloor()}
        >
          Add Floor
        </Button>
      </Stack>

      {/* Submit Button */}
      <LoadingButton
        loading={isSubmitting}
        size="large"
        variant="contained"
        onClick={() => onSubmit(building)}
        sx={{ alignSelf: "flex-end" }}
      >
        Submit
      </LoadingButton>
    </Stack>
  );
}
