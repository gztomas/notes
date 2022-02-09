export const NEW_NOTE_BUTTON = ":text-is('New note')";
export const DELETE_NOTE_BUTTON = (name: string) =>
  `[data-test="note-item"]:has-text("${name}") >> data-test=delete-note`;
export const NOTE_LIST_ITEM = (name: string) =>
  `[data-test=note-item]:has-text("${name}")`;
export const NOTE_TITLE_INPUT = '[placeholder="Untitled note"]';
export const EDITOR = '[data-test="editable"]';

export const getNoteName = () =>
  `Note ${Math.random().toString(36).substring(2, 5)}`;
