import { HistoryEdu } from "@mui/icons-material";
import {
  Box,
  Drawer,
  Fab,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { NotesList } from "./notes/NotesList";
import { useNewNote } from "./notes/useNewNote";
import { theme } from "./theme";

const drawerWidth = 240;

interface LayoutProps {
  activeNoteId?: string;
  children?: React.ReactNode;
}

export const Layout = ({ activeNoteId, children = null }: LayoutProps) => {
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
