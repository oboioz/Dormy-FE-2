import { useNavigate } from 'react-router-dom';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// routes
import { PATH_REGISTER } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
// assets
import { Helmet } from 'react-helmet-async';
import { EmailInboxIcon } from '../../assets/icons';
import { useSelector } from '../../redux/store';
import EnterEmailForm from '../../sections/registration/EnterEmailForm';

// ----------------------------------------------------------------------

export default function EnterEmailPage() {
  const navigate = useNavigate();

  const { generalInformation } = useSelector((state) => state.registration.registrationInformation);


  return (
    <>
      <Helmet>
        <title> Email | Registration</title>
      </Helmet>

      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Enter Your Email
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Please enter the email address associated with your account registration. Please notice that one email  for one registration only
      </Typography>

      {/* <EnterEmailForm generalInformation={generalInformation} /> */}

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
            onClick={() => navigate(PATH_REGISTER.policy)} // Change this based on your path
            size='large'
          >
            Back to Login
          </Button>

          {/* Next Step Button */}
          <Button
            variant="contained"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            onClick={() => navigate(PATH_REGISTER.bed)} // Change this based on your path
            size='large'
          >
            Next Step
          </Button>
        </Stack>

      </Container>
    </>
  );
}
