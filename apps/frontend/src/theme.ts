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
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&&&": {
            textTransform: "none",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          "&&&": {
            marginTop: 5,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: { "&&&": { width: 240, flexShrink: 0 } },
        paper: {
          "&&&": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#F7F6F3",
          },
        },
      },
    },
    MuiListItemIcon: {},
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
