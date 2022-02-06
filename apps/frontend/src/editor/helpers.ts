import isHotkey from "is-hotkey";
import { KeyboardEvent } from "react";
import { Editor, Element as SlateElement, Range, Transforms } from "slate";
import { CustomElementType, CustomText, MarkType } from "./types";

const LIST_TYPES = ["orderedList", "unorderedList"];

const isList = (
  type: CustomElementType
): type is "orderedList" | "unorderedList" => LIST_TYPES.includes(type);

export const toggleBlock = (
  editor: Editor,
  blockType: CustomElementType
): void => {
  const isActive = isBlockActive(editor, blockType);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList(blockType) ? "listItem" : blockType,
  });

  if (!isActive && isList(blockType)) {
    const block = { type: blockType, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor: Editor, markType: MarkType) => {
  const isActive = isMarkActive(editor, markType);

  if (isActive) {
    Editor.removeMark(editor, markType);
  } else {
    Editor.addMark(editor, markType, true);
  }
};

export const hasSelection = (editor: Editor) => {
  const { selection } = editor;
  return selection && !Range.isCollapsed(selection);
};

export const insertLink = (editor: Editor, text: string, url: string) => {
  Transforms.insertNodes(editor, {
    type: "link",
    url,
    children: [{ text: url }],
  });
};

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
};

export const isBlockActive = (
  editor: Editor,
  blockType: CustomElementType
): boolean => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === blockType,
  });

  return !!match;
};

export const isMarkActive = (
  editor: Editor,
  mark: keyof Omit<CustomText, "text">
): boolean => {
  const marks = Editor.marks(editor);
  return Boolean(marks && mark in marks && marks[mark]);
};

const HOTKEYS: Record<string, MarkType> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export const handleHotkeys =
  (editor: Editor) =>
  (event: KeyboardEvent<HTMLDivElement>): void => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };
