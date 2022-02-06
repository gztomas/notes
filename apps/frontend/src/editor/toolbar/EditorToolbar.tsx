import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  InsertLink,
  LooksOne,
  LooksTwo,
} from "@mui/icons-material";
import { Box, Button, Divider, Popover, Stack, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useSlate } from "slate-react";
import {
  insertLink,
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
  unwrapLink,
} from "../helpers";
import { CustomElementType, MarkType } from "../types";
import { ToolbarButton } from "./ToolbarButton";

export const EditorToolbar = (): React.ReactElement => {
  const editor = useSlate();

  const markHandler = (markType: MarkType) => (e: React.MouseEvent) => {
    e.preventDefault();
    toggleMark(editor, markType);
  };
  const blockHandler =
    (blockType: CustomElementType) => (e: React.MouseEvent) => {
      e.preventDefault();
      toggleBlock(editor, blockType);
    };
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Box m={1} display={"flex"}>
      <ToolbarButton
        title="Heading1"
        onMouseDown={blockHandler("heading1")}
        active={isBlockActive(editor, "heading1")}
      >
        <LooksOne />
      </ToolbarButton>
      <ToolbarButton
        title="Heading2"
        onMouseDown={blockHandler("heading2")}
        active={isBlockActive(editor, "heading2")}
      >
        <LooksTwo />
      </ToolbarButton>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ margin: "0 10px" }}
        variant="middle"
      />

      <ToolbarButton
        title="Bold"
        onMouseDown={markHandler("bold")}
        active={isMarkActive(editor, "bold")}
      >
        <FormatBold />
      </ToolbarButton>
      <ToolbarButton
        title="Italic"
        onMouseDown={markHandler("italic")}
        active={isMarkActive(editor, "italic")}
      >
        <FormatItalic />
      </ToolbarButton>
      <ToolbarButton
        title="Underline"
        onMouseDown={markHandler("underline")}
        active={isMarkActive(editor, "underline")}
      >
        <FormatUnderlined />
      </ToolbarButton>
      <ToolbarButton
        title="Code"
        onMouseDown={markHandler("code")}
        active={isMarkActive(editor, "code")}
      >
        <Code />
      </ToolbarButton>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ margin: "0 10px" }}
        variant="middle"
      />

      <ToolbarButton
        title="Numbered List"
        onMouseDown={blockHandler("orderedList")}
        active={isBlockActive(editor, "orderedList")}
      >
        <FormatListNumbered />
      </ToolbarButton>
      <ToolbarButton
        title="Bulleted List"
        onMouseDown={blockHandler("unorderedList")}
        active={isBlockActive(editor, "unorderedList")}
      >
        <FormatListBulleted />
      </ToolbarButton>
      <ToolbarButton
        title="Quote"
        onMouseDown={blockHandler("blockQuote")}
        active={isBlockActive(editor, "blockQuote")}
      >
        <FormatQuote />
      </ToolbarButton>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ margin: "0 10px" }}
        variant="middle"
      />

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack
          m={2}
          spacing={1}
          component="form"
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const text = data.get("text");
            const url = data.get("url");
            if (typeof text === "string" && typeof url === "string") {
              insertLink(editor, text, url);
              setAnchorEl(null);
            }
          }}
        >
          <TextField
            required
            name="text"
            label="Text"
            placeholder="text"
          ></TextField>
          <TextField
            required
            name="url"
            label="URL"
            placeholder="url"
          ></TextField>
          <Button
            type="submit"
            variant="outlined"
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            Insert
          </Button>
        </Stack>
      </Popover>
      <ToolbarButton
        title="Insert Link"
        onMouseDown={(e) => {
          e.preventDefault();
          if (isBlockActive(editor, "link")) {
            unwrapLink(editor);
          } else {
            setAnchorEl(e.currentTarget);
          }
        }}
        active={isBlockActive(editor, "link")}
      >
        <InsertLink />
      </ToolbarButton>
    </Box>
  );
};
