import { Avatar, AvatarGroup, Tooltip } from "@mui/material";
import { getLocalUser, UserData } from "./users";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

interface UserAvatarsProps {
  users: UserData[];
}

export const UserAvatars = ({ users }: UserAvatarsProps) => {
  const localUser = getLocalUser();
  return (
    <AvatarGroup max={4}>
      {[localUser, ...users].map((user) => (
        <Tooltip
          key={user.name}
          title={user.name === localUser.name ? "Yourself" : user.name}
        >
          <Avatar alt={user.name} sx={{ bgcolor: user.color }}>
            {getInitials(user.name)}
          </Avatar>
        </Tooltip>
      ))}
    </AvatarGroup>
  );
};
