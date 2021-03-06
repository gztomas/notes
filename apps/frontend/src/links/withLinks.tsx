import { Editor } from "slate";
import { insertLink } from "./insertLink";

const isUrl = (url: string) => /(www|http:|https:)+[^\s]+[\w]/.test(url);

/**
 * Slate plugin that enables inline link elements and converts inserted text
 * that matches a URL into link elements
 */
export const withLinks = (editor: Editor) => {
  const { insertData, isInline, insertText } = editor;

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      insertLink(editor, { text, url: text });
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      insertLink(editor, { text, url: text });
    } else {
      insertData(data);
    }
  };

  editor.isInline = (element) => element.type === "link" || isInline(element);

  return editor;
};
