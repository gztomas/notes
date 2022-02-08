import { AutomergeEditor } from "@slate-collaborative/client/lib/automerge-editor";
import { WithSocketIOEditor } from "@slate-collaborative/client/lib/withSocketIO";
import { BaseEditor, BaseElement, BaseText } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export interface ParagraphElement extends BaseElement {
  type: "paragraph";
}
export interface Heading1Element extends BaseElement {
  type: "heading1";
}
export interface Heading2Element extends BaseElement {
  type: "heading2";
}
export interface BlockQuoteElement extends BaseElement {
  type: "blockQuote";
}
export interface UnorderedListElement extends BaseElement {
  type: "unorderedList";
}
export interface OrderedListElement extends BaseElement {
  type: "orderedList";
}
export interface ListItemElement extends BaseElement {
  type: "listItem";
}
export interface LinkElement extends BaseElement {
  type: "link";
  url: string;
}

export type CustomElement =
  | ParagraphElement
  | Heading1Element
  | Heading2Element
  | BlockQuoteElement
  | UnorderedListElement
  | OrderedListElement
  | ListItemElement
  | LinkElement;

export type CustomElementType = CustomElement["type"];

export interface CustomText extends BaseText {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
  isCaret?: boolean;
  alphaColor: string;
  name: string;
  color: string;
  isForward: boolean;
}

export type MarkType = keyof Omit<CustomText, "text">;

// Slate suggests overwriting the module to include the ReactEditor, Custom Elements & Text
// https://docs.slatejs.org/concepts/12-typescript
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor &
      ReactEditor &
      HistoryEditor &
      WithSocketIOEditor &
      AutomergeEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export const isElement = (node: Node): node is HTMLElement =>
  node.nodeType === Node.ELEMENT_NODE;
