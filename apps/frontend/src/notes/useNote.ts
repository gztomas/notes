import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { NoteResponse } from "../../../backend/routes/notes";
import { SlateContent } from "../editor/types";

/**
 * Responsible for the behavior of a note
 */
export const useNote = (id: string) => {
  const { readyState, lastMessage, sendMessage } = useWebSocket(
    `ws://localhost:3001/api/notes/${id}`,
    { retryOnError: true }
  );
  const note: NoteResponse | null = lastMessage && JSON.parse(lastMessage.data);

  const updateNote = (newNote: Partial<NoteResponse>) => {
    sendMessage(JSON.stringify(newNote));
  };

  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState<SlateContent | undefined>(
    note?.content
  );

  useEffect(() => {
    if (note && !content) setContent(note.content);
  });

  useEffect(() => {
    if (note) setTitle(note.title);
  }, [note?.title]);

  const handleContentChange = (newContent: SlateContent) => {
    setContent(newContent);
    updateNote({ content: newContent });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    updateNote({ title: newTitle });
  };

  return {
    content,
    handleContentChange,
    handleTitleChange,
    note,
    readyState,
    title,
  };
};
