import { createEditor as createSlateEditor } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { withCollaboration } from "./collaboration/withCollaboration";
import { withLinks } from "./links/withLinks";
import { withGDocs } from "./gDocs/withGDocs";

export const createEditor = (docId: string) => {
  return withCollaboration(
    withLinks(withGDocs(withHistory(withReact(createSlateEditor())))),
    docId
  );
};
