// @refresh reset // Fixes hot refresh errors in development https://github.com/ianstormtaylor/slate/issues/3477

import { ReadyState } from "react-use-websocket";
import { EditorView } from "../editor/EditorView";
import { NoteHeader } from "./NoteHeader";
import { NoteData } from "./types";

interface NoteProps {
  note: NoteData;
  onTitleChange: (value: string) => void;
  readyState: ReadyState;
}

export const Note = ({ note, onTitleChange, readyState }: NoteProps) => (
  <EditorView
    contentId={note.contentId}
    renderHeader={(cursors) => (
      <NoteHeader
        users={cursors}
        onTitleChange={onTitleChange}
        readyState={readyState}
        initialTitle={note.title}
      />
    )}
  />
);
