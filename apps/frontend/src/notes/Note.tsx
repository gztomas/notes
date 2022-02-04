import { Badge, BadgeProps, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { Descendant } from "slate";
import { EditorView } from "../editor/EditorView";
import { useNote } from "./hooks";

interface NoteProps {
  id: string;
}

const CONNECTION_BADGE_COLOR: Record<ReadyState, BadgeProps["color"]> = {
  [ReadyState.CONNECTING]: "info",
  [ReadyState.OPEN]: "success",
  [ReadyState.CLOSING]: "warning",
  [ReadyState.CLOSED]: "error",
  [ReadyState.UNINSTANTIATED]: "error",
};

export const Note = ({ id }: NoteProps) => {
  const { note, readyState, updateNote } = useNote(id);
  const [value, setValue] = useState<Descendant[]>(
    note?.content ?? [{ type: "paragraph", children: [{ text: "" }] }]
  );

  useEffect(() => {
    if (note) {
      setValue(note?.content);
    }
  }, [JSON.stringify(note?.content)]);

  const handleChange = (value: Descendant[]) => {
    setValue(value);
    updateNote(value);
  };

  return note ? (
    <>
      <Badge
        color={CONNECTION_BADGE_COLOR[readyState]}
        variant="dot"
        sx={{ width: "100%" }}
      >
        <TextField
          value={note.title}
          variant="standard"
          fullWidth={true}
          inputProps={{ style: { fontSize: 32, color: "#666" } }}
          sx={{ mb: 2 }}
        />
      </Badge>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <EditorView value={value} onChange={handleChange} />
      </Paper>
    </>
  ) : null;
};
