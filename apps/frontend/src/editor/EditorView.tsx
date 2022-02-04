import { useState } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { handleHotkeys } from "./helpers";
import { renderElement } from "./renderElement";
import { renderLeaf } from "./renderLeaf";
import { EditorToolbar } from "./toolbar/EditorToolbar";
import { withHtml } from "./withHtml";

interface EditorViewProps {
  onChange: (value: Descendant[]) => void;
  value: Descendant[];
}

export const EditorView = ({ value, onChange }: EditorViewProps) => {
  const [editor] = useState(() =>
    withHtml(withHistory(withReact(createEditor())))
  );

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <EditorToolbar />
      <Editable
        autoFocus
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={handleHotkeys(editor)}
        // The dev server injects extra values to the editor and the console complains
        // so we override them here to remove the message
        autoCapitalize="false"
        autoCorrect="false"
        spellCheck="false"
      />
    </Slate>
  );
};
