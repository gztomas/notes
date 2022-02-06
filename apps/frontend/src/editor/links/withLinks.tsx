import { Editor } from "slate";
import { insertLink } from "../helpers";

const isUrl = (url: string) => /(www|http:|https:)+[^\s]+[\w]/.test(url);

export const withLinks = (editor: Editor): Editor => {
  const { insertData, isInline, insertText } = editor;

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      insertLink(editor, text, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      insertLink(editor, text, text);
    } else {
      insertData(data);
    }
  };

  editor.isInline = (element) => element.type === "link" || isInline(element);

  return editor;
};
