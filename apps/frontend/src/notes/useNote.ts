import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { Descendant } from "slate";
import { useSWRConfig } from "swr";
import { NoteResponse } from "../../../backend/routes/notes";

export const useNote = (id: string) => {
  const { readyState, lastMessage, sendMessage } = useWebSocket(
    `ws://localhost:3001/api/notes/${id}`
  );
  const { mutate } = useSWRConfig();
  const note = lastMessage && (JSON.parse(lastMessage.data) as NoteResponse);

  const updateNote = (newNote: Partial<NoteResponse>) => {
    sendMessage(JSON.stringify(newNote));
    mutate("http://localhost:3001/api/notes");
  };

  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState<Descendant[] | undefined>(
    note?.content
  );

  useEffect(() => {
    if (note && !content) setContent(note.content);
  });

  useEffect(() => {
    if (note) setTitle(note.title);
  }, [note?.title]);

  const handleContentChange = (newContent: Descendant[]) => {
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
