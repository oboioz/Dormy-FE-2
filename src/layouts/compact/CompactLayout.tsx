import { Outlet } from 'react-router-dom';
// @mui
import { Container, Stack } from '@mui/material';

// config
import { HEADER } from '../../config-global';
//
import useOffSetTop from '../../hooks/useOffSetTop';
import Header from './Header';

// ----------------------------------------------------------------------

export default function CompactLayout() {
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <>
      <Header isOffset={isOffset} />

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <Outlet />
        </Stack>
      </Container>
    </>
  );
}
