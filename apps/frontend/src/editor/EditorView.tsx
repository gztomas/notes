// @refresh reset // Fixes hot refresh errors in development https://github.com/ianstormtaylor/slate/issues/3477

import React, { useState } from "react";
import { BaseEditor, createEditor, Descendant } from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { CustomElement } from "./CustomElement";
import { CustomText, renderLeaf } from "./renderLeaf";
import { handleHotkeys } from "./helpers";
import { renderElement } from "./renderElement";
import { EditorToolbar } from "./toolbar/EditorToolbar";
import { withHtml } from "./withHtml";

// Slate suggests overwriting the module to include the ReactEditor, Custom Elements & Text
// https://docs.slatejs.org/concepts/12-typescript
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

interface EditorProps {
  initialValue?: Descendant[];
  placeholder?: string;
}

export const EditorView: React.FC<EditorProps> = ({
  initialValue = [],
  placeholder,
}) => {
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
