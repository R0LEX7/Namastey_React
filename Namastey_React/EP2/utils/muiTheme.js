import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Montserrat", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#0F0F14", // Secondary color
    },
    background: {
      default: "#08080B", // Background color
    },
    text: {
      primary: "#D6CDCD", // Font color
    },
  },
});

export default theme;
