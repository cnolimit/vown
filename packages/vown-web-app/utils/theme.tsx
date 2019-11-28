import red from '@material-ui/core/colors/red'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5F259F',
    },
    secondary: {
      main: '#3CDBC0',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#F5F6FA',
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
})

export default theme
