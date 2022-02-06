import { ButtonProps, IconButton, Tooltip } from "@mui/material";

export const ToolbarButton = (props: ButtonProps & { active: boolean }) => {
  const { title, active, ...buttonProps } = props;
  const button = (
    <IconButton
      {...buttonProps}
      sx={{ borderRadius: 1, marginLeft: 0.5, marginRight: 0.5 }}
      size="small"
      color={active ? "secondary" : "primary"}
    />
  );
  return title ? (
    <Tooltip arrow title={title}>
      {button}
    </Tooltip>
  ) : (
    button
  );
};
