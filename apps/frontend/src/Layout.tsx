import { Box, Drawer, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { theme } from "./theme";

interface LayoutProps {
  side: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export const Layout = ({ side, footer, children }: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Drawer variant="permanent">
          <Typography
            flexShrink={0}
            fontFamily="Merryweather"
            fontWeight="bold"
            mb={2}
            mt={5}
            textAlign="center"
            variant="h1"
          >
            N
          </Typography>
          <Box minHeight={0} overflow="scroll" flexGrow={1}>
            {side}
          </Box>
          <Box mx="auto" mt={2} mb={3}>
            {footer}
          </Box>
        </Drawer>
        <Box
          component="main"
          display="flex"
          flexDirection="column"
          flexGrow={1}
          height="100vh"
          overflow="auto"
          pl={0}
          pr={0}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
