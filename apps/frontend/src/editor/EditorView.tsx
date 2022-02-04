// @refresh reset // Fixes hot refresh errors in development https://github.com/ianstormtaylor/slate/issues/3477

import { useState } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { handleHotkeys } from "./helpers";
import { renderElement } from "./renderElement";
import { renderLeaf } from "./renderLeaf";
import { EditorToolbar } from "./toolbar/EditorToolbar";
import { withHtml } from "./withHtml";

interface EditorProps {
  initialValue?: Descendant[];
  placeholder?: string;
}

export const EditorView = ({ initialValue = [], placeholder }: EditorProps) => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [editor] = useState(() =>
    withHtml(withHistory(withReact(createEditor())))
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        console.log(value);
        setValue(value);
      }}
    >
      <EditorToolbar />
      <Editable
        autoFocus
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder={placeholder}
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
