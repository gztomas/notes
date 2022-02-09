import { withIOCollaboration } from "@slate-collaborative/client";
import { Editor } from "slate";
import { getLocalUser } from "./users";

/**
 * Slate plugin that enables automerge with remote editors
 */
export const withCollaboration = (
  editor: Editor,
  docId: string,
  onConnect: () => void
) => {
  const { color, name } = getLocalUser();
  return withIOCollaboration(editor, {
    docId: `/${docId}`,
    cursorData: { name, color, alphaColor: color.slice(0, -2) + "0.2)" },
    url: `http://localhost:3002/${docId}`,
    connectOpts: {
      query: { name },
    },
    onConnect,
  });
};
