import { Badge, BadgeProps, Tooltip } from "@mui/material";
import { ReadyState } from "react-use-websocket";

const COLOR: Record<ReadyState, BadgeProps["color"]> = {
  [ReadyState.CONNECTING]: "info",
  [ReadyState.OPEN]: "success",
  [ReadyState.CLOSING]: "warning",
  [ReadyState.CLOSED]: "error",
  [ReadyState.UNINSTANTIATED]: "error",
};
const LEGEND: Record<ReadyState, string> = {
  [ReadyState.CONNECTING]: "Connecting...",
  [ReadyState.OPEN]: "Connected",
  [ReadyState.CLOSING]: "Warning",
  [ReadyState.CLOSED]: "Closed",
  [ReadyState.UNINSTANTIATED]: "Error",
};

interface ConnectionBadgeProps extends BadgeProps {
  readyState: ReadyState;
}

export const ConnectionBadge = ({
  readyState,
  ...props
}: ConnectionBadgeProps) => (
  <Tooltip title={LEGEND[readyState]}>
    <Badge
      color={COLOR[readyState]}
      badgeContent=" "
      variant="dot"
      overlap="circular"
      {...props}
    />
  </Tooltip>
);
