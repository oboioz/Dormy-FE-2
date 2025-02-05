// @mui
import { Card, Stack, Typography } from '@mui/material';
// @types
//
import { IVehicle } from '../../@types/vehicle';

// ----------------------------------------------------------------------

type Props = {
  vehicle: IVehicle;
};

export default function VehicleDetails({ vehicle }: Props) {
  return (
    <Card sx={{ p: 3 }}>
      <Typography
        variant="overline"
        sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
      >
        Information
      </Typography>

      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Vehicle ID
          </Typography>
          <Typography variant="subtitle2">{vehicle.vehicleID}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Vehicle Brand
          </Typography>
          <Typography variant="subtitle2">({vehicle.type}) </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Garage
          </Typography>
          <Typography variant="subtitle2">
            {vehicle.parkingSpot.spotNumber}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Registration Date
          </Typography>
          <Typography variant="subtitle2">
            vehicle.registrationDate
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            License Plate
          </Typography>
          <Typography variant="subtitle2">
            {vehicle.licensePlate}
          </Typography>
        </Stack>

      </Stack>

    </Card>
  );
}
