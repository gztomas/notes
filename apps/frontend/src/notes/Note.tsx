// @refresh reset // Fixes hot refresh errors in development https://github.com/ianstormtaylor/slate/issues/3477

import { EditorView } from "../editor/EditorView";
import { NoteHeader } from "./NoteHeader";
import { useNote } from "./useNote";

export const Note = (props: { id: string }) => {
  const { id } = props;
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
