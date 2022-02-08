// @refresh reset // Fixes hot refresh errors in development https://github.com/ianstormtaylor/slate/issues/3477

import { EditorView } from "../editor/EditorView";
import { NoteHeader } from "./NoteHeader";
import { useNote } from "./useNote";

interface NoteProps {
  id: string;
}

export const Note = ({ id }: NoteProps) => {
  const { content, handleContentChange, title, handleTitleChange, readyState } =
    useNote(id);

  return content ? (
    <EditorView
      docId={id}
      value={content}
      onChange={handleContentChange}
      renderHeader={(cursors) => (
        <NoteHeader
          users={cursors}
          onTitleChange={handleTitleChange}
          readyState={readyState}
          title={title}
        />
      )}
    />
  ) : null;
};
