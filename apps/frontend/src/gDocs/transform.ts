import { SlateContent } from "../editor/types";

const isHTMLElement = (node: Node): node is HTMLElement =>
  node.nodeType === Node.ELEMENT_NODE;

/**
 * Transforms a GDoc imported HTML document into Slate content
 */
export const transform = (htmlNode: Node): SlateContent => {
  const { nodeName, nodeType, textContent, childNodes } = htmlNode;
  const children = Array.from(childNodes).map(transform).flat();

  if (nodeType === Node.TEXT_NODE && textContent) {
    return [{ text: textContent }];
  } else if (!isHTMLElement(htmlNode)) {
    return [];
  } else if (nodeName === "UL") {
    return [{ type: "unorderedList", children }];
  } else if (nodeName === "BR") {
    return [{ type: "paragraph", children: [{ text: "" }] }];
  } else if (nodeName === "OL") {
    return [{ type: "orderedList", children }];
  } else if (nodeName === "LI") {
    return [{ type: "listItem", children }];
  } else if (nodeName === "P") {
    const { style } = htmlNode;
    // Not ideal but these margins are the only indicator this is a block quote
    // coming from GDocs
    if (style.marginLeft === "30pt" && style.marginRight === "30pt") {
      return [{ type: "blockQuote", children }];
    } else return [{ type: "paragraph", children }];
  } else if (nodeName === "A") {
    const url = htmlNode.getAttribute("href");
    if (url) return [{ type: "link", url, children }];
  } else if (nodeName === "H1") {
    return [{ type: "heading1", children }];
  } else if (nodeName === "H2") {
    return [{ type: "heading2", children }];
  } else if (nodeName === "SPAN" && textContent) {
    const { style } = htmlNode;
    // GDocs doesn't really use HTML tags for formatting, but inline styles, so
    // depending on them here
    return [
      {
        text: textContent,
        underline: style.textDecoration === "underline",
        italic: style.fontStyle === "italic",
        bold: Number(style.fontWeight) > 400,
      },
    ];
  }

  return children;
};
