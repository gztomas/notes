import { Assignment as AssignmentIcon, Delete } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { useDeleteNote } from "./useDeleteNote";
import { useNotesList } from "./useNotesList";

interface NotesListProps {
  activeNoteId?: string;
}

export const NotesList = ({ activeNoteId }: NotesListProps) => {
  const deleteNote = useDeleteNote();
  const notesList = useNotesList();
  const router = useRouter();

  return (
    <List>
      {notesList?.map(({ id, title }) => (
        <ListItem
          disablePadding
          key={id}
          secondaryAction={
            <IconButton size="small" edge="end" onClick={() => deleteNote(id)}>
              <Delete fontSize="small" />
            </IconButton>
          }
        >
          <ListItemButton
            dense
            selected={id === activeNoteId}
            onClick={() => router.push(`/notes/${id}`)}
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
};
