import { WithSocketIOEditor } from "@slate-collaborative/client/lib/withSocketIO";
import { BaseEditor, BaseText, Descendant } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { SlateElement } from "./elements";
import { SlateMark } from "./marks";

export type SlateContent = Descendant[];

// Slate suggests overwriting the module to include the ReactEditor, Custom Elements & Text
// https://docs.slatejs.org/concepts/12-typescript
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & WithSocketIOEditor;
    Element: SlateElement;
    Text: BaseText & SlateMark;
  }
}
