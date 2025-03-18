// @mui
import { Container } from '@mui/material';
// routes
// redux
// sections
import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from '../../components/settings';
import WorkplaceForm from '../../sections/@dashboard/admin/resident/WorkplaceForm';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function WorkplaceFormPage() {

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Workplace Form | Admin</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}
        sx={{
          pt: 15,
          pb: 10,
          // flexDirection: 'column',
          // alignItems: 'center', // Centers horizontally
          // justifyContent: 'center', // Centers vertically
          minHeight: '100vh', // Ensures full viewport height for vertical centering
        }}
      >

        <WorkplaceForm
          workplaceInformation={null}
        />
      </Container >
    </>
  );
}
