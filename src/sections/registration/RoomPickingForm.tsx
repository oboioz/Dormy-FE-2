import { m } from 'framer-motion';
// @mui
import { Button, Stack, TextField, Typography } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';
import { RHFSelect } from '../../components/hook-form/RHFSelect';

// ----------------------------------------------------------------------

const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  },
];


// ----------------------------------------------------------------------

export default function RoomPickingForm() {
  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
          Choose room that suited to your preference
        </Typography>
      </m.div>

      <Stack spacing={3}>

        <RHFSelect native name="gender" label="Gender" placeholder="Gender">
          <option value="" />
          {countries.map((country) => (
            <option key={country.code} value={country.label}>
              {country.label}
            </option>
          ))}
        </RHFSelect>

        <RHFSelect native name="building" label="Building" placeholder="Building">
          <option value="" />
          {countries.map((country) => (
            <option key={country.code} value={country.label}>
              {country.label}
            </option>
          ))}
        </RHFSelect>

        <RHFSelect native name="floor" label="Floor" placeholder="Floor">
          <option value="" />
          {countries.map((country) => (
            <option key={country.code} value={country.label}>
              {country.label}
            </option>
          ))}
        </RHFSelect>

        <RHFSelect native name="room" label="Room" placeholder="Room">
          <option value="" />
          {countries.map((country) => (
            <option key={country.code} value={country.label}>
              {country.label}
            </option>
          ))}
        </RHFSelect>
      </Stack>
    </Stack>
  );
}
