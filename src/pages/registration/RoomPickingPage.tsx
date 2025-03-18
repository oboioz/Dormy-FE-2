// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// routes
import { PATH_REGISTER } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
// assets
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../redux/store';
import RoomPickingForm from '../../sections/registration/RoomPickingForm';

// ----------------------------------------------------------------------

export default function RoomPickingPage() {

  const navigate = useNavigate();

  const { generalInformation } = useSelector((state) => state.registration.registrationInformation);



  return (
    <>
      <Helmet>
        <title> Bed Picking | Registration</title>
      </Helmet>

      <Container
        sx={{
          pt: 15,
          pb: 10,
        }}
      >
        <Typography variant="h3" align="center" paragraph>
          Room Picking
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
          Stay where you want to
        </Typography>
      </Container>

      <Container sx={{ py: 10 }}>

        <RoomPickingForm />

      </Container>


      <Container
        sx={{
          pt: 15,
          pb: 10,
        }}
      >
        {/* Back to Login Button */}
        <Stack spacing={3} direction="row" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={() => navigate(PATH_REGISTER.email)} // Change this based on your path
            size='large'
          >
            Back to Login
          </Button>

          {/* Next Step Button */}
          <Button
            variant="contained"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            onClick={() => navigate(PATH_REGISTER.form)} // Change this based on your path
            size='large'
          >
            Next Step
          </Button>
        </Stack>

      </Container>
    </>
  );
}
