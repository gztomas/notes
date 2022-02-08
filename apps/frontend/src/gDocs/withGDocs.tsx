import { Editor, Transforms } from "slate";
import { transform } from "./transform";

/**
 * Whether this html document comes from GDocs
 */
const isGDoc = (doc: Document) =>
  Boolean(doc.querySelector("b")?.id.startsWith("docs-internal"));

/**
 * Slate plugin to enable formatting when pasting documents from Google Docs
 */
export const withGDocs = (editor: Editor): Editor => {
  const { insertData } = editor;

  editor.insertData = (data) => {
    const html = data.getData("text/html");

    if (html) {
      const parsed = new DOMParser().parseFromString(html, "text/html");
      if (isGDoc(parsed)) {
        const fragment = transform(parsed.body);
        if (fragment) {
          Transforms.insertFragment(editor, fragment);
          return;
        }
      }
    }
    return insertData(data);
  };

  return editor;
};
