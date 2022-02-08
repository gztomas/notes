import { Editor } from "slate";

export interface SlateTextMark {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface SlateCaretMark extends SlateTextMark {
  isCaret: true;
  alphaColor: string;
  name: string;
  color: string;
  isForward: boolean;
}

export type SlateMark = SlateTextMark | SlateCaretMark;

export type SlateMarkType = keyof SlateMark;

export const hasCaretMark = (mark: SlateMark): mark is SlateCaretMark =>
  "isCaret" in mark && mark.isCaret;

export const isMarkActive = (
  editor: Editor,
  mark: keyof Omit<SlateMark, "text">
): boolean => {
  const marks = Editor.marks(editor);
  return Boolean(marks && mark in marks && marks[mark]);
};

export const toggleMark = (editor: Editor, markType: SlateMarkType) => {
  const isActive = isMarkActive(editor, markType);

  if (isActive) {
    Editor.removeMark(editor, markType);
  } else {
    Editor.addMark(editor, markType, true);
  }
};
