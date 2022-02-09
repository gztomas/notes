import { Button, Popover, PopoverProps, Stack, TextField } from "@mui/material";

interface LinkPopoverProps extends Omit<PopoverProps, "open"> {
  onInsert(link: { text: string; url: string }): void;
}

/**
 * Displays a form that gets user input for link insertion
 */
export const LinkPopover = ({ onInsert, ...props }: LinkPopoverProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = data.get("text");
    const url = data.get("url");
    if (typeof text === "string" && typeof url === "string") {
      onInsert({ text, url });
    }
  };

  return (
    <Popover
      open={Boolean(props.anchorEl)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      {...props}
    >
      <Stack m={2} spacing={1} component="form" onSubmit={handleSubmit}>
        <TextField required name="text" label="Text" placeholder="text" />
        <TextField required name="url" label="URL" placeholder="url" />
        <Button type="submit" variant="outlined">
          Insert
        </Button>
      </Stack>
    </Popover>
  );
};
