import { createEditor as createSlateEditor } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { withCollaboration } from "../collaboration/withCollaboration";
import { withGDocs } from "../gDocs/withGDocs";
import { withLinks } from "../links/withLinks";

export const createEditor = (docId: string, onConnect: () => void) => {
  return withCollaboration(
    withLinks(withGDocs(withHistory(withReact(createSlateEditor())))),
    docId,
    onConnect
  );
};
