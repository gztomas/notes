import { ButtonProps, IconButton, Tooltip } from "@mui/material";

interface ToolbarButtonProps extends ButtonProps {
  active: boolean;
}

export const ToolbarButton = ({
  title,
  active,
  ...buttonProps
}: ToolbarButtonProps) => {
  const button = (
    <IconButton
      {...buttonProps}
      sx={{ borderRadius: 1, marginLeft: 0.5, marginRight: 0.5 }}
      size="small"
      color={active ? "secondary" : "primary"}
    />
  );
  return title ? <Tooltip title={title}>{button}</Tooltip> : button;
};
