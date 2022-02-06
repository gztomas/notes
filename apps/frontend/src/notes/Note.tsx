// @refresh reset // Fixes hot refresh errors in development https://github.com/ianstormtaylor/slate/issues/3477

import { DescriptionOutlined } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  BadgeProps,
  Box,
  Divider,
  TextField,
} from "@mui/material";
import { ReadyState } from "react-use-websocket";
import { EditorView } from "../editor/EditorView";
import { EditorToolbar } from "../editor/toolbar/EditorToolbar";
import { useNote } from "./useNote";

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
  const { content, handleContentChange, title, handleTitleChange, readyState } =
    useNote(id);

  return content ? (
    <EditorView
      value={content}
      onChange={handleContentChange}
      header={
        <Box position="sticky" top={0} zIndex={1} bgcolor={"#E8E7E4"}>
          <Box display="flex" marginX={2} marginTop={5} alignItems="center">
            <Badge
              color={CONNECTION_BADGE_COLOR[readyState]}
              badgeContent=" "
              variant="dot"
              overlap="circular"
            >
              <DescriptionOutlined color="primary" fontSize="large" />
            </Badge>
            <TextField
              onChange={handleTitleChange}
              placeholder="Untitled note"
              value={title}
              inputProps={{ style: { fontSize: 20, fontWeight: 700 } }}
              sx={{ marginX: 3 }}
            />
            <Avatar>U</Avatar>
          </Box>
          <EditorToolbar />
          <Divider />
        </Box>
      }
    />
  ) : null;
};
