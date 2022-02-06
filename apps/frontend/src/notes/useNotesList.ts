import useSWR from "swr";
import { NotesResponse } from "../../../backend/routes/notes";

// If you want to use GraphQL API or libs like Axios, you can create your own fetcher function.
// Check here for more examples: https://swr.vercel.app/docs/data-fetching
const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

export const useNotesList = () => {
  const { data, error } = useSWR<NotesResponse>(
    "http://localhost:3001/api/notes",
    fetcher
  );

  return {
    notesList: data?.notes,
    isLoading: !error && !data,
    isError: error,
  };
};
