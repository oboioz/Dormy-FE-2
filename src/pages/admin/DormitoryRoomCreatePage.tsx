import { useNavigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
// redux
import { useDispatch } from '../../redux/store';
// sections
import { useSettingsContext } from '../../components/settings';

import { Helmet } from 'react-helmet-async';
import DormitoryRoomCreateForm from '../../sections/@dashboard/admin/venue/DormitoryRoomCreateForm';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function DormitoryRoomCreatePage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Form | Room</title>
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

        <DormitoryRoomCreateForm />
      </Container >
    </>
  );
}
