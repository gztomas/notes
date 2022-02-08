import { Editor, Element, Transforms } from "slate";

/**
 * Removes link treatment for the node at cursor
 */
export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (node) =>
      !Editor.isEditor(node) && Element.isElement(node) && node.type === "link",
  });
};
