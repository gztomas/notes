import { DescriptionOutlined } from "@mui/icons-material";
import { Box, Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { UserData } from "../collaboration/users";
import { UserAvatars } from "../collaboration/UsersAvatars";
import { EditorToolbar } from "../toolbar/EditorToolbar";
import { ConnectionBadge } from "./ConnectionBadge";

interface NoteHeaderProps {
  initialTitle?: string;
  onTitleChange: (value: string) => void;
  readyState: ReadyState;
  users: UserData[];
}

export const NoteHeader = ({
  initialTitle,
  onTitleChange,
  readyState,
  users,
}: NoteHeaderProps) => {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  return (
    <Box position="sticky" top={0} zIndex={1} bgcolor={"#E8E7E4"}>
      <Box display="flex" marginX={2} marginTop={5} alignItems="center">
        <ConnectionBadge readyState={readyState}>
          <DescriptionOutlined color="primary" fontSize="large" />
        </ConnectionBadge>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => onTitleChange(e.target.value)}
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
