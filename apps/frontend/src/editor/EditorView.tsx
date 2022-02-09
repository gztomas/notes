// @refresh reset // Fixes hot refresh errors in development https://github.com/ianstormtaylor/slate/issues/3477

import { Box, LinearProgress } from "@mui/material";
import { useCursor } from "@slate-collaborative/client";
import { useEffect, useState } from "react";
import { Editable, Slate } from "slate-react";
import { isUserData, UserData } from "../collaboration/users";
import { createEditor } from "./createEditor";
import { handleHotkeys } from "./hotkeys";
import { renderElement } from "./renderElement";
import { renderLeaf } from "./renderLeaf";
import { SlateContent } from "./types";

interface EditorViewProps {
  renderHeader: (users: UserData[]) => React.ReactNode;
  contentId: string;
}

export const EditorView = ({ renderHeader, contentId }: EditorViewProps) => {
  const [editor] = useState(() =>
    createEditor(contentId, () => setConnected(true))
  );
  const { decorate, cursors } = useCursor(editor);
  const [connected, setConnected] = useState(false);
  const [value, setValue] = useState<SlateContent>([
    { type: "paragraph", children: [{ text: "" }] },
  ]);

  useEffect(() => {
    editor.connect();
    return editor.destroy;
  }, []);

  return connected ? (
    <Slate editor={editor} onChange={setValue} value={value}>
      {renderHeader(isUserData(cursors) ? cursors : [])}
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
          data-test="editable"
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
  ) : (
    <LinearProgress />
  );
};
