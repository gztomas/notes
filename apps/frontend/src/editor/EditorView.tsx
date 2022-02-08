// @refresh reset // Fixes hot refresh errors in development https://github.com/ianstormtaylor/slate/issues/3477

import { Box } from "@mui/material";
import { useCursor } from "@slate-collaborative/client";
import { useEffect, useState } from "react";
import { Descendant } from "slate";
import { Editable, Slate } from "slate-react";
import { createEditor } from "./createEditor";
import { handleHotkeys } from "./helpers";
import { renderElement } from "./renderElement";
import { renderLeaf } from "./renderLeaf";

interface EditorViewProps {
  renderHeader: (
    cursors: ReturnType<typeof useCursor>["cursors"]
  ) => React.ReactNode;
  onChange: (value: Descendant[]) => void;
  value: Descendant[];
  docId: string;
}

export const EditorView = ({
  value,
  onChange,
  renderHeader,
  docId,
}: EditorViewProps) => {
  const [editor] = useState(() => createEditor(docId));
  const { decorate, cursors } = useCursor(editor);

  useEffect(() => {
    editor.connect();
    return editor.destroy;
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      {renderHeader(cursors)}
      <Box
        sx={{
          flexGrow: 1,
          "[data-slate-editor]": {
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 6,
            paddingRight: 6,
            fontFamily: "Merriweather",
            maxWidth: "800px",
            margin: "auto",
            minHeight: "600px!important",
          },
        }}
      >
        <Editable
          decorate={decorate}
          placeholder="Write something down"
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
      </Box>
    </Slate>
  );
};
