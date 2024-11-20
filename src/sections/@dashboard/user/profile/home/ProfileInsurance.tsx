// @mui
import { Card, CardHeader, Link, Stack, Typography } from '@mui/material';
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
        <Typography variant="body2">QUOTE</Typography>

        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">
            Live at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              Coutrny
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:email-fill" />
          <Typography variant="body2">Email</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />

          <Typography variant="body2">
            Role
            <Link component="span" variant="subtitle2" color="text.primary">
              Company
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />

          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              School
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
