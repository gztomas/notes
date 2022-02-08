import { Editor, Transforms } from "slate";

export const insertLink = (
  editor: Editor,
  link: { text: string; url: string }
) =>
  Transforms.insertNodes(editor, {
    type: "link",
    url: link.url,
    children: [{ text: link.text }],
  });
