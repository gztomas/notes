import { useRouter } from "next/router";

export const useNewNote = () => {
  const router = useRouter();
  return async () => {
    const res = await fetch("http://localhost:3001/api/notes", {
      method: "POST",
    });
    const { id } = await res.json();
    router.push(`/notes/${id}`);
  };
};
