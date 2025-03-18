// @mui
import { Button, Divider, IconButton, Link, Stack, Typography } from '@mui/material';
// components

// assets
import { useNavigate } from 'react-router-dom';
import { UploadIllustration } from '../../assets/illustrations';
import { DialogAnimate } from '../../components/animate';
import Iconify from '../../components/iconify';
import { PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function RegistrationComplete({ open, onClose }) {

  const navigate = useNavigate();

  return (
    <DialogAnimate
      fullScreen
      open={open}
      PaperProps={{
        sx: {
          maxWidth: { md: 'calc(100% - 48px)' },
          maxHeight: { md: 'calc(100% - 48px)' },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'grey.500',
        }}
      >
        <Iconify icon="eva:close-fill" />
      </IconButton>


      <Stack
        spacing={5}
        sx={{
          m: 'auto',
          maxWidth: 480,
          textAlign: 'center',
          px: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4">Registration Completed!</Typography>

        <UploadIllustration sx={{ height: 260 }} />

        <Typography>
          Your registration sent successfully.
          <br />
          <br />
          <Link>01dc1370-3df6-11eb-b378-0242ac130002</Link>
          <br />
          <br />
          We will send you a notification within 5 days when the registration process completed.
          <br /> If you have any question or queries then fell to get in contact us. <br /> <br />
          All the best,
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack
          spacing={2}
          justifyContent="space-between"
          direction={{ xs: 'column-reverse', sm: 'row' }}
        >
          <Button
            variant="outlined"
            onClick={onClose} // Change this based on your path
            size='large'
          >
            Close
          </Button>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={() => navigate(PATH_AUTH.login)}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Back to Login page
          </Button>
        </Stack>
      </Stack>
    </DialogAnimate>
  );
}
