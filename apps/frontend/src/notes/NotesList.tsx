import { Assignment as AssignmentIcon, Delete } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { NoteData } from "./types";

interface NotesListProps {
  notes: NoteData[];
  activeNoteId?: string;
  onOpenNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

export const NotesList = ({
  notes,
  activeNoteId,
  onOpenNote,
  onDeleteNote,
}: NotesListProps) => (
  <List data-test="notes-list">
    {notes?.map(({ id, title }) => (
      <ListItem
        data-test="note-item"
        disablePadding
        key={id}
        secondaryAction={
          <Tooltip title="Delete" placement="right">
            <IconButton
              size="small"
              edge="end"
              onClick={() => onDeleteNote(id)}
              data-test="delete-note"
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        }
      >
        <ListItemButton
          dense
          selected={id === activeNoteId}
          onClick={() => onOpenNote(id)}
        >
          <ListItemIcon>
            <AssignmentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={title ? title : "Untitled note"}
            sx={title ? undefined : { color: "gray" }}
          />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);
