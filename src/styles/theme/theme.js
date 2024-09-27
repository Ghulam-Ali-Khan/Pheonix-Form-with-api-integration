import { createTheme } from '@mui/material';

export const palette = {
  primary: {
    main: '#ffeb25',
    darkPurple: '#003c60',
    lightPurple: '#005385',
    contrastText: '#26201c',
  },
};

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },

  palette: {
    primary: {
      main: '#e5c200',
      contrastText: '#ffffff',
    },
  },

  typography: {
    fontFamily: "'Roboto', sans-serif !important",
    smallText: {
      fontSize: '12px',
      fontWeight: 300,
      color: palette.primary.contrastText,
      fontFamily: 'Roboto, sans-serif',

      '@media (max-width: 991px)': {
        fontSize: '10px',
      },
    },
  },
});

export default theme;
