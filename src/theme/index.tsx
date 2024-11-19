// @mui
import { CssBaseline } from '@mui/material';

//

import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
  ThemeOptions,
} from '@mui/material/styles';
import { useMemo } from 'react';

import customShadows from './customShadows';
import GlobalStyles from './globalStyles';
import palette from './palette';
import shadows from './shadows';
import typography from './typography';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {


  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: palette('light'),
      typography,
      shape: { borderRadius: 8 },
      shadows: shadows('light'),
      customShadows: customShadows('light'),
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>


        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
