import { useRouter } from "next/router";

export const useDeleteNote = () => {
  const router = useRouter();

  return async (id: string) => {
    const activeNoteId = String(router.query.id);
    await fetch(`http://localhost:3001/api/notes/${id}`, {
      method: "DELETE",
    });
    if (id === activeNoteId) {
      router.push("/");
    }
  };
};
