import { DescriptionOutlined } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Badge,
  BadgeProps,
  Box,
  Divider,
  TextField,
} from "@mui/material";
import { useCursor } from "@slate-collaborative/client";
import { ReadyState } from "react-use-websocket";
import { EditorToolbar } from "../editor/toolbar/EditorToolbar";

const CONNECTION_BADGE_COLOR: Record<ReadyState, BadgeProps["color"]> = {
  [ReadyState.CONNECTING]: "info",
  [ReadyState.OPEN]: "success",
  [ReadyState.CLOSING]: "warning",
  [ReadyState.CLOSED]: "error",
  [ReadyState.UNINSTANTIATED]: "error",
};

export const NoteHeader = (props: {
  title?: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readyState: ReadyState;
  cursors: ReturnType<typeof useCursor>["cursors"];
}) => {
  const { title, onTitleChange, readyState, cursors } = props;
  return (
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
          onChange={onTitleChange}
          placeholder="Untitled note"
          value={title}
          inputProps={{ style: { fontSize: 20, fontWeight: 700 } }}
          sx={{ marginX: 3 }}
        />
        <AvatarGroup max={4}>
          <Avatar>U</Avatar>
          {cursors.map((cursor) => (
            <Avatar
              alt={cursor.name}
              key={cursor.name}
              sx={{ bgcolor: cursor.color, borderColor: cursor.alphaColor }}
            >
              {`${(cursor.name as string)
                .split(" ")
                .map((w) => w[0])
                .join("")}`}
            </Avatar>
          ))}
        </AvatarGroup>
      </Box>
      <EditorToolbar />
      <Divider />
    </Box>
  );
};
