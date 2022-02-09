import { HistoryEdu } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

interface EmptyStateProps {
  onNewNote: () => void;
}

export const EmptyState = ({ onNewNote }: EmptyStateProps) => (
  <Box
    fontSize="100pt"
    alignSelf="center"
    display="flex"
    flexDirection="column"
    alignItems="center"
    mt={10}
  >
    <HistoryEdu fontSize="inherit" sx={{ opacity: 0.1 }} />
    <Button onClick={onNewNote}>Start by creating a new note</Button>
  </Box>
);
