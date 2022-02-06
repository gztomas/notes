import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

export const useDeleteNote = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  return async (id: string) => {
    const activeNoteId = String(router.query.id);
    await fetch(`http://localhost:3001/api/notes/${id}`, {
      method: "DELETE",
    });
    mutate("http://localhost:3001/api/notes");
    if (id === activeNoteId) {
      router.push("/");
    }
  };
};
