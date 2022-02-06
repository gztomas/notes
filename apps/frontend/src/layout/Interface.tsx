import { HistoryEdu } from "@mui/icons-material";
import {
  Box,
  createTheme,
  Drawer,
  Fab,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import { NotesList } from "../notes/NotesList";
import { useNewNote } from "../notes/useNewNote";

const drawerWidth = 240;

interface InterfaceProps {
  activeNoteId?: string;
  children?: React.ReactNode;
}

const theme = createTheme({
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

const Interface = ({ activeNoteId, children = null }: InterfaceProps) => {
  const handleNewNote = useNewNote();
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#F7F6F3",
            },
          }}
        >
          <Toolbar sx={{ marginTop: 5 }}>
            <Typography
              noWrap
              variant="h1"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                fontFamily: "Merriweather",
                textAlign: "center",
              }}
            >
              N
            </Typography>
          </Toolbar>
          <NotesList activeNoteId={activeNoteId} />
          <Box mx="auto" mt="auto" mb={3}>
            <Fab variant="extended" onClick={handleNewNote}>
              <HistoryEdu sx={{ mr: 1 }} />
              New Note
            </Fab>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            pl: 0,
            pr: 0,
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Interface;
