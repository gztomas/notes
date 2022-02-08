import { DescriptionOutlined } from "@mui/icons-material";
import { Badge, BadgeProps, Box, Divider, TextField } from "@mui/material";
import { ReadyState } from "react-use-websocket";
import { UserData } from "../editor/collaboration/users";
import { UserAvatars } from "../editor/collaboration/UsersAvatars";
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
  users: UserData[];
}) => {
  const { title, onTitleChange, readyState, users: users } = props;
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
        <UserAvatars users={users} />
      </Box>
      <EditorToolbar />
      <Divider />
    </Box>
  );
};
