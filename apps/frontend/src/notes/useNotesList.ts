import useWebSocket from "react-use-websocket";
import { NotesResponse } from "../../../backend/routes/notes";

export const useNotesList = () => {
  const { lastMessage } = useWebSocket(`ws://localhost:3001/api/notes`, {
    retryOnError: true,
  });
  const data = lastMessage && (JSON.parse(lastMessage.data) as NotesResponse);
  return data?.notes;
};
