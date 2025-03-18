// @mui
import { Card, CardHeader, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

export default function ProfileInsurance() {
  return (
    <Card>
      <CardHeader title="Health Insurance" />

      <Stack spacing={2} sx={{ p: 3 }}>

        <Stack direction="row">
          <StyledIcon icon="mdi:card-account-details-outline" />

          <Typography variant="body2">
            Insurance Code: &nbsp;0400-834-833-E1E
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="mdi:map-marker" />
          <Typography variant="body2">Address: Ho Chi Minh City</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="mdi:hospital-box" />

          <Typography variant="body2">
            Hospital: Trung Vuong Hospital
          </Typography>
        </Stack>

      </Stack>
    </Card>
  );
}
