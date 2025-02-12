import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
// assets
import { EmailInboxIcon } from '../../assets/icons';
import EnterEmailForm from '../../sections/registration/EnterEmailForm';

// ----------------------------------------------------------------------

export default function EnterEmailPage() {
  return (
    <>
      {/* <Helmet>
        <title> Enter Email</title>
      </Helmet> */}

      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Enter Your Email
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Please enter the email address associated with your account registration. Please notice that one email  for one registration only
      </Typography>

      <EnterEmailForm />

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
