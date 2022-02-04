import { Descendant, Editor, Transforms } from "slate";
import { isElement } from "./types";

const deserialize = (htmlNode: Node): Descendant[] => {
  const { nodeName, nodeType, textContent, childNodes } = htmlNode;
  const children = Array.from(childNodes).map(deserialize).flat();

  if (nodeType === Node.TEXT_NODE && textContent) {
    return [{ text: textContent }];
  } else if (!isElement(htmlNode)) {
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
    if (style.marginLeft === "30pt" && style.marginRight === "30pt") {
      return [{ type: "blockQuote", children }];
    } else return [{ type: "paragraph", children }];
  } else if (nodeName === "A") {
    return [{ type: "link", href: htmlNode.getAttribute("href"), children }];
  } else if (nodeName === "H1") {
    return [{ type: "heading1", children }];
  } else if (nodeName === "H2") {
    return [{ type: "heading2", children }];
  } else if (nodeName === "SPAN" && textContent) {
    const { style } = htmlNode;
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

export const withHtml = (editor: Editor): Editor => {
  const { insertData } = editor;

  editor.insertData = (data) => {
    const html = data.getData("text/html");

    if (html) {
      const parsed = new DOMParser().parseFromString(html, "text/html");
      const fragment = deserialize(parsed.body);
      if (fragment) {
        Transforms.insertFragment(editor, fragment);
      }
      return;
    }

    return insertData(data);
  };

  return editor;
};
