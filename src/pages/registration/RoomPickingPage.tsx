import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Container, Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
// assets
import RoomPickingForm from '../../sections/registration/RoomPickingForm';

// ----------------------------------------------------------------------

export default function EnterEmailPage() {
  return (
    <>
      {/* <Helmet>
        <title> Enter Email</title>
      </Helmet> */}

      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
        <Typography variant="h3" align="center" paragraph>
          {`Let's finish powering you up!`}
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
          Professional plan is right for you.
        </Typography>
      </Container>

      <Container sx={{ py: 10 }}>

        <RoomPickingForm />

      </Container>


      <Link
        component={RouterLink}
        to={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Return to sign in
      </Link>
    </>
  );
}
