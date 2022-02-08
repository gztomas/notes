import { createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: blueGrey,
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
        disableElevation: true,
        disableRipple: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          "&&&": {
            marginTop: 5,
          },
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
