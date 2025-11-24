import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#aa6eae',
    },
    secondary: {
      main: '#aa6eae',
    },
    background: {
      default: '#fef0ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#222',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#fef0ff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: '12px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#eabbed',
          marginLeft: '2px',
          marginRight: '2px',
        },
        contained: {
          borderRadius: '999px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          marginLeft: '0px',
          marginRight: '0px',
        },
        outlined: {
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: '#e9d9f2',
          color: '#ffffff',
          backgroundColor: '#aa6eae',
          '&:hover': {
            backgroundColor: '#995f9e',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#ffffff',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          border: '2px solid #e9d9f2',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

export default theme;