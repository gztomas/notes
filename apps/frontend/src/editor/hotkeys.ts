import isHotkey from "is-hotkey";
import { Editor } from "slate";
import { SlateMarkType, toggleMark } from "./marks";

const HOTKEYS: Record<string, SlateMarkType> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export const handleHotkeys =
  (editor: Editor) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };
