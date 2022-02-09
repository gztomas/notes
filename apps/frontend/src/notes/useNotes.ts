import { useRouter } from "next/router";
import useWebSocket from "react-use-websocket";
import { NoteData } from "./types";

export const useNotes = () => {
  const { lastMessage, readyState } = useWebSocket(
    `ws://localhost:3001/api/notes`,
    { shouldReconnect: () => true, retryOnError: true }
  );

  const notes =
    (lastMessage &&
      (JSON.parse(lastMessage.data) as { notes: NoteData[] }).notes) ??
    [];

  const router = useRouter();

  const createNote = async () => {
    const res = await fetch("http://localhost:3001/api/notes", {
      method: "POST",
    });
    const { id } = await res.json();
    router.push(`/notes/${id}`);
  };

  const updateNote = async (id: string, title: string) => {
    await fetch(`http://localhost:3001/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
      headers: { "Content-type": "application/json" },
    });
  };

  const deleteNote = async (id: string) => {
    const activeNoteId = String(router.query.id);
    await fetch(`http://localhost:3001/api/notes/${id}`, {
      method: "DELETE",
    });
    if (id === activeNoteId) {
      router.push("/");
    }
  };

  const openNote = (noteId: string) => router.push(`/notes/${noteId}`);

  const activeNote = notes.find(({ id }) => id === String(router.query.id));

  return {
    activeNote,
    notes,
    createNote,
    updateNote,
    deleteNote,
    openNote,
    readyState,
  };
};
