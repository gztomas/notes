import { BaseElement, Editor, Element, Transforms } from "slate";

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

export type SlateElement =
  | ParagraphElement
  | Heading1Element
  | Heading2Element
  | BlockQuoteElement
  | UnorderedListElement
  | OrderedListElement
  | ListItemElement
  | LinkElement;

export type SlateElementType = SlateElement["type"];

const LIST_TYPES = ["orderedList", "unorderedList"];

const isListElement = (
  type: SlateElementType
): type is "orderedList" | "unorderedList" => LIST_TYPES.includes(type);

export const toggleElementType = (
  editor: Editor,
  elementType: SlateElementType
): void => {
  const isActive = isElementType(editor, elementType);

  Transforms.unwrapNodes(editor, {
    match: (node) =>
      !Editor.isEditor(node) &&
      Element.isElement(node) &&
      isListElement(node.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive
      ? "paragraph"
      : isListElement(elementType)
      ? "listItem"
      : elementType,
  });

  if (!isActive && isListElement(elementType)) {
    const block = { type: elementType, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isElementType = (
  editor: Editor,
  elementType: SlateElementType
): boolean => {
  const [match] = Editor.nodes(editor, {
    match: (node) =>
      !Editor.isEditor(node) &&
      Element.isElement(node) &&
      node.type === elementType,
  });

  return Boolean(match);
};
