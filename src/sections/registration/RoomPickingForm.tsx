// @mui
import { Grid, Stack, Typography } from '@mui/material';
// components
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { IBuilding, IRoom } from '../../@types/room';
import { IUser } from '../../@types/user';
import { MotionViewport } from '../../components/animate';
import FormProvider from '../../components/hook-form';
import { RHFSelect } from '../../components/hook-form/RHFSelect';

// ----------------------------------------------------------------------

const buildings: IBuilding[] = [
  { buildingID: 1, name: 'Building A', floorNumber: 5, genderRestriction: 'male', roomID: 101 },
  { buildingID: 2, name: 'Building B', floorNumber: 5, genderRestriction: 'female', roomID: 102 },
];

const floors = [
  { value: 1, label: '1st Floor' },
  { value: 2, label: '2nd Floor' },
];

const rooms: IRoom[] = [
  {
    roomID: 101,
    roomNumber: '101',
    floorNumber: 1,
    roomType: { roomTypeID: 1, roomTypeName: 'Standard', description: 'Basic room', capacity: 4, price: 100 },
    totalUsedBed: 2,
    totalAvailableBed: 2,
    status: 'Available',
    building: buildings[0],
  },
  {
    roomID: 102,
    roomNumber: '102',
    floorNumber: 1,
    roomType: { roomTypeID: 2, roomTypeName: 'Deluxe', description: 'Premium room', capacity: 6, price: 150 },
    totalUsedBed: 3,
    totalAvailableBed: 3,
    status: 'Available',
    building: buildings[1],
  },
];

const initialBeds = (count: number) =>
  Array.from({ length: count }, (_, i) => ({ id: i + 1, status: 'default' }));



// ----------------------------------------------------------------------

export default function RoomPickingForm() {

  type FormValuesProps = {
    gender: string;
    building: string;
    floor: string;
    room: string;
  };

  type Props = {
    generalInformation: IUser;
  };

  const UpdateSchema = Yup.object().shape({
    gender: Yup.string().required('Gender is required!'),
    building: Yup.string().required('Building is required!'),
    floor: Yup.string().required('Floor is required!'),
    room: Yup.string().required('Room is required!'),
  });

  const defaultValues: FormValuesProps = {
    gender: '',
    building: '',
    floor: '',
    room: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateSchema),
    defaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;
  const selectedRoom = watch('room');

  const [beds, setBeds] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);

  // Handle form value change
  // const handleChange = (name: keyof FormValuesProps, value: string) => {
  //   setValue(name, value);

  //   if (name === 'roomID') {
  //     const selectedRoom = rooms.find((r) => r.roomID.toString() === value);
  //     setBeds(generateBeds(selectedRoom?.totalAvailableBed || 0));
  //   }
  // };

  // // Handle bed selection
  // const handleBedClick = (id: number) => {
  //   setSelectedBed(id);
  //   setBeds((prev) => prev.map((bed) => ({ ...bed, status: bed.id === id ? 'selecting' : 'default' })));
  // };

  // Handle form submissio

  return (
    <FormProvider methods={methods} >
      <Grid item xs={12} md={4}>
        {/* Left Side - Form Inputs */}
        <Stack component={MotionViewport} spacing={5}>
          <Typography variant="h3">Choose a room that suits your preference</Typography>

          <Stack spacing={3}>
            <RHFSelect native name="gender" label="Gender" placeholder="Gender">
              <option value="" />
              <option value="male">Male</option>
              <option value="female">Female</option>
            </RHFSelect>

            <RHFSelect native name="buildingID" label="Building" placeholder="Building">
              <option value="" />
              {buildings.map((building) => (
                <option key={building.buildingID} value={building.buildingID}>{building.name}</option>
              ))}
            </RHFSelect>

            <RHFSelect native name="floorNumber" label="Floor" placeholder="Floor">
              <option value="" />
              {floors.map((floor) => (
                <option key={floor.value} value={floor.value}>
                  {floor.label}
                </option>
              ))}
            </RHFSelect>

            <RHFSelect native name="roomID" label="Room" placeholder="Room">
              <option value="" />
              {rooms.map((room) => (
                <option key={room.roomID} value={room.roomNumber}>
                  {room.roomNumber}
                </option>
              ))}
            </RHFSelect>
          </Stack>
        </Stack>
      </Grid>

      {/* <Grid item xs={12} md={8}>
      </Grid> */}


    </FormProvider>
  );
}
