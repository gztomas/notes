import { DescriptionOutlined } from "@mui/icons-material";
import { Box, Divider, TextField } from "@mui/material";
import { ReadyState } from "react-use-websocket";
import { UserData } from "../collaboration/users";
import { UserAvatars } from "../collaboration/UsersAvatars";
import { EditorToolbar } from "../toolbar/EditorToolbar";
import { ConnectionBadge } from "./ConnectionBadge";

interface NoteHeaderProps {
  title?: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readyState: ReadyState;
  users: UserData[];
}

export const NoteHeader = ({
  title,
  onTitleChange,
  readyState,
  users,
}: NoteHeaderProps) => {
  return (
    <Box position="sticky" top={0} zIndex={1} bgcolor={"#E8E7E4"}>
      <Box display="flex" marginX={2} marginTop={5} alignItems="center">
        <ConnectionBadge readyState={readyState}>
          <DescriptionOutlined color="primary" fontSize="large" />
        </ConnectionBadge>
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
