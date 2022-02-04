import { Assignment as AssignmentIcon } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useNotesList } from "./hooks";

interface NotesListProps {
  activeNoteId?: string;
}

export const NotesList = ({ activeNoteId }: NotesListProps) => {
  const { notesList } = useNotesList();

  return (
    <List>
      {notesList?.map((note) => (
        <Link href={`/notes/${note.id}`} key={note.id}>
          <ListItemButton selected={note.id === activeNoteId}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={note.title} />
          </ListItemButton>
        </Link>
      ))}
    </List>
  );
};
