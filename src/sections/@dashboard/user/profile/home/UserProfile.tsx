// @mui
import { Grid, Stack } from '@mui/material';
// @types
//
import ProfileInformation from './ProfileInformation';
import ProfileInsurance from './ProfileInsurance';
import ProfileQR from './ProfileQR';
// ----------------------------------------------------------------------

export default function UserProfile() {
  return (
    <Grid container spacing={3}>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <ProfileInformation />

        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileQR />
          <ProfileInsurance />
        </Stack>
      </Grid>


    </Grid>
  );
}
