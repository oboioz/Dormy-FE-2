// @mui
import { Box, Button, Stack, Typography } from '@mui/material';
// components
import { useState } from 'react';
import { MotionViewport } from '../../components/animate';
import { RHFSelect } from '../../components/hook-form/RHFSelect';

// ----------------------------------------------------------------------

const buildings = [
  { value: 'A', label: 'Building A' },
  { value: 'B', label: 'Building B' },
];

const floors = [
  { value: '1', label: '1st Floor' },
  { value: '2', label: '2nd Floor' },
];

const rooms = [
  { value: '101', label: 'Room 101', beds: 4 },
  { value: '102', label: 'Room 102', beds: 6 },
  { value: '103', label: 'Room 103', beds: 8 },
];

const initialBeds = (count) => Array.from({ length: count }, (_, i) => ({ id: i + 1, status: 'default' }));


// ----------------------------------------------------------------------




export default function RoomPickingForm() {

  const [formData, setFormData] = useState({ gender: '', building: '', floor: '', room: '' });
  const [beds, setBeds] = useState<{ id: number; status: string }[]>([]);
  const [selectedBed, setSelectedBed] = useState(null);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (name === 'room') {
      const selectedRoom = rooms.find((r) => r.value === value);
      setBeds(initialBeds(selectedRoom?.beds || 0));
    }
  };

  const handleBedClick = (id) => {
    setSelectedBed(id);
    setBeds((prev) =>
      prev.map((bed) => ({ ...bed, status: bed.id === id ? 'selecting' : 'default' }))
    );
  };



  return (
    <Box
      gap={10}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
      }}
    >


      <Stack component={MotionViewport} spacing={5}>

        <Typography variant="h3">
          Choose room that suited to your preference
        </Typography>


        <Stack spacing={3}>

          <RHFSelect native name="gender" label="Gender" placeholder="Gender" onChange={(e) => handleChange('gender', e.target.value)}>
            <option value="" />
            <option value="male">Male</option>
            <option value="female">Female</option>
          </RHFSelect>

          <RHFSelect native name="building" label="Building" placeholder="Building" onChange={(e) => handleChange('building', e.target.value)}>
            <option value="" />
            {buildings.map((building) => (
              <option key={building.value} value={building.value}>{building.label}</option>
            ))}
          </RHFSelect>

          <RHFSelect native name="floor" label="Floor" placeholder="Floor" onChange={(e) => handleChange('floor', e.target.value)}>
            <option value="" />
            {floors.map((floor) => (
              <option key={floor.value} value={floor.value}>{floor.label}</option>
            ))}
          </RHFSelect>

          <RHFSelect native name="room" label="Room" placeholder="Room" onChange={(e) => handleChange('room', e.target.value)}>
            <option value="" />
            {rooms.map((room) => (
              <option key={room.value} value={room.value}>{room.label}</option>
            ))}
          </RHFSelect>
        </Stack>
      </Stack>

      {beds.length > 0 && (
        <Stack spacing={3}>
          <Typography variant="h5">Select a Bed</Typography>
          <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(50px, 1fr))" gap={2}>
            {beds.map((bed) => (
              <Button
                key={bed.id}
                variant="contained"
                color={bed.status === 'selecting' ? 'primary' : 'inherit'}
                onClick={() => handleBedClick(bed.id)}
              >
                {bed.id}
              </Button>
            ))}
          </Box>
        </Stack>
      )}

      <Stack direction="row" justifyContent="space-between" mt={4}>
        <Button variant="outlined" color="primary">Back</Button>
        <Button variant="contained" color="primary">Continue</Button>
      </Stack>




    </Box>
  );
}
