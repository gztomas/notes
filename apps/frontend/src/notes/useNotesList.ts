import { useRouter } from "next/router";
import useWebSocket from "react-use-websocket";
import { NotesResponse } from "../../../backend/routes/notes";

/**
 * Responsible for the behavior of the list
 */
export const useNotesList = () => {
  const { lastMessage } = useWebSocket(`ws://localhost:3001/api/notes`, {
    retryOnError: true,
  });
  const data = lastMessage && (JSON.parse(lastMessage.data) as NotesResponse);

  const router = useRouter();
  const openNote = (noteId: string) => router.push(`/notes/${noteId}`);

  const deleteNote = async (id: string) => {
    const activeNoteId = String(router.query.id);
    await fetch(`http://localhost:3001/api/notes/${id}`, {
      method: "DELETE",
    });
    if (id === activeNoteId) {
      router.push("/");
    }
  };

  return { notes: data?.notes, deleteNote, openNote };
};
