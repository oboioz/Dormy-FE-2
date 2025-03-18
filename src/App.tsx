import 'react-lazy-load-image-component/src/effects/blur.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from './auth/JwtContext';
import { MotionLazyContainer } from './components/animate';
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { SettingsProvider } from './components/settings';
import { SnackbarProvider } from './components/snackbar';
import ThemeLocalization from './locales';
import { persistor, store } from './redux/store';
import ThemeProvider from './theme';

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SettingsProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <MotionLazyContainer>
                    <ThemeProvider>

                      <ThemeLocalization>
                        <SnackbarProvider>
                          <StyledChart />
                          <Router />
                        </SnackbarProvider>
                      </ThemeLocalization>

                    </ThemeProvider>
                  </MotionLazyContainer>
                </BrowserRouter>
              </SettingsProvider>
            </LocalizationProvider>
          </PersistGate>
        </ReduxProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
