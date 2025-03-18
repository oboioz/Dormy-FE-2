// @mui
import { Grid, Stack } from '@mui/material';
// @types
//
import AdminInformation from './AdminInformation';
import AdminQR from './AdminQR';
// ----------------------------------------------------------------------

export default function AdminProfile() {
  return (
    <Grid container spacing={3}>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <AdminInformation />
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <AdminQR />
        </Stack>
      </Grid>


    </Grid>
  );
}
