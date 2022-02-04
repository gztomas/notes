import { BaseEditor, BaseElement, BaseText } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

interface ParagraphElement extends BaseElement {
  type: "paragraph";
}
interface Heading1Element extends BaseElement {
  type: "heading1";
}
interface Heading2Element extends BaseElement {
  type: "heading2";
}
interface BlockQuoteElement extends BaseElement {
  type: "blockQuote";
}
interface UnorderedListElement extends BaseElement {
  type: "unorderedList";
}
interface OrderedListElement extends BaseElement {
  type: "orderedList";
}
interface ListItemElement extends BaseElement {
  type: "listItem";
}
interface LinkElement extends BaseElement {
  type: "link";
  href: string | null;
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
}

// Slate suggests overwriting the module to include the ReactEditor, Custom Elements & Text
// https://docs.slatejs.org/concepts/12-typescript
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export const isElement = (node: Node): node is HTMLElement =>
  node.nodeType === Node.ELEMENT_NODE;
