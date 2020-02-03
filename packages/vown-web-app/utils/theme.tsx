import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      dark: '#42196f',
      main: '#5F259F',
      light: '#7f50b2',
      contrastText: '#5F259F',
    },
    secondary: {
      dark: '#209788',
      main: '#2ED9C3',
      light: '#57e0cf',
      contrastText: '#2ED9C3',
    },
    error: {
      dark: '#aa2e25',
      main: '#f44336',
      light: '#f6685e',
      contrastText: '#f44336',
    },
    background: {
      default: '#F5F5F5',
    },
    text: {
      primary: 'rgba(33, 49, 77, 0.87)',
      secondary: 'rgba(33, 49, 77, 0.54)',
      disabled: 'rgba(33, 49, 77, 0.38)',
      hint: 'rgba(33, 49, 77, 0.38)',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Nunito Sans", sans-serif;',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: '2.285rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
  },
  shape: {
    borderRadius: 4,
  },
})

export default theme
