import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

export const useNewNote = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  return async () => {
    const res = await fetch("http://localhost:3001/api/notes", {
      method: "POST",
    });
    mutate("http://localhost:3001/api/notes");
    const { id } = await res.json();
    router.push(`/notes/${id}`);
  };
};
