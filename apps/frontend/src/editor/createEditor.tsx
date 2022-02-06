import { createEditor as createSlateEditor } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { withGoogleDoc } from "./withGoogleDoc";
import { withLinks } from "./links/withLinks";

export const createEditor = () => {
  return withLinks(withGoogleDoc(withHistory(withReact(createSlateEditor()))));
};
