import { withIOCollaboration } from "@slate-collaborative/client";
import { Editor } from "slate";
import { getLocalUser } from "./users";

export const withCollaboration = (editor: Editor, docId: string) => {
  const { color, name } = getLocalUser();
  return withIOCollaboration(editor, {
    docId: `/${docId}`,
    cursorData: { name, color, alphaColor: color.slice(0, -2) + "0.2)" },
    url: `http://localhost:3002/${docId}`,
    connectOpts: {
      query: { name },
    },
  });
};
