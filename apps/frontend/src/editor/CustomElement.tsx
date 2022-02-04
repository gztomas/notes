import { BaseElement } from "slate";

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
