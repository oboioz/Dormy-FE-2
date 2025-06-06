import { m } from 'framer-motion';
import { useLocation } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, LinearProgress } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// config
import { NAV } from '../../config-global';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
//
import Logo from '../logo';
import ProgressBar from '../progress-bar';
import { useSettingsContext } from '../settings';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 9998,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function LoadingScreen() {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const { user } = useAuthContext();

  const { themeLayout } = useSettingsContext();

  const isDashboard = user && pathname.includes('/dashboard') && isDesktop;

  const size =
    (themeLayout === 'mini' && NAV.W_DASHBOARD_MINI) ||
    (themeLayout === 'vertical' && NAV.W_DASHBOARD) ||
    128;

  return (
    <>
      <ProgressBar />

      <StyledRoot
        sx={{
          ...(isDashboard && {
            width: `calc(100% - ${size}px)`,
            ...(themeLayout === 'horizontal' && {
              width: 1,
              height: `calc(100% - ${size}px)`,
            }),
          }),
        }}
      >
        {isDashboard ? (
          <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
        ) : (
          <>
            <m.div
              animate={{
                scale: [1, 0.9, 0.9, 1, 1],
                opacity: [1, 0.48, 0.48, 1, 1],
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeatDelay: 1,
                repeat: Infinity,
              }}
            >
              <Logo disabledLink sx={{ width: 64, height: 64 }} />
            </m.div>

            <Box
              component={m.div}
              animate={{
                scale: [1.6, 1, 1, 1.6, 1.6],
                rotate: [270, 0, 0, 270, 270],
                opacity: [0.25, 1, 1, 1, 0.25],
                borderRadius: ['25%', '25%', '50%', '50%', '25%'],
              }}
              transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
              sx={{
                width: 100,
                height: 100,
                position: 'absolute',
                border: (theme) => `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,
              }}
            />

            <Box
              component={m.div}
              animate={{
                scale: [1, 1.2, 1.2, 1, 1],
                rotate: [0, 270, 270, 0, 0],
                opacity: [1, 0.25, 0.25, 0.25, 1],
                borderRadius: ['25%', '25%', '50%', '50%', '25%'],
              }}
              transition={{
                ease: 'linear',
                duration: 3.2,
                repeat: Infinity,
              }}
              sx={{
                width: 120,
                height: 120,
                position: 'absolute',
                border: (theme) => `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
              }}
            />
          </>
        )}
      </StyledRoot>
    </>
  );
}
