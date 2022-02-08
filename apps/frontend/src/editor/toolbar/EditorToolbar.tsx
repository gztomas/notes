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
import { Box, Divider } from "@mui/material";
import React, { useState } from "react";
import { useSlate } from "slate-react";
import {
  isElementType,
  SlateElementType,
  toggleElementType,
} from "../elements";
import { insertLink } from "../links/insertLink";
import { LinkPopover } from "../links/LinkPopover";
import { unwrapLink } from "../links/unwrapLink";
import { isMarkActive, SlateMarkType, toggleMark } from "../marks";
import { ToolbarButton } from "./ToolbarButton";

export const EditorToolbar = () => {
  const editor = useSlate();

  const markHandler = (markType: SlateMarkType) => (e: React.MouseEvent) => {
    e.preventDefault();
    toggleMark(editor, markType);
  };

  const elementHandler =
    (elementType: SlateElementType) => (e: React.MouseEvent) => {
      e.preventDefault();
      toggleElementType(editor, elementType);
    };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Box m={1} display={"flex"}>
      <ToolbarButton
        title="Heading1"
        onMouseDown={elementHandler("heading1")}
        active={isElementType(editor, "heading1")}
      >
        <LooksOne />
      </ToolbarButton>
      <ToolbarButton
        title="Heading2"
        onMouseDown={elementHandler("heading2")}
        active={isElementType(editor, "heading2")}
      >
        <LooksTwo />
      </ToolbarButton>

      <Divider orientation="vertical" flexItem sx={{ margin: "0 10px" }} />

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
        onMouseDown={elementHandler("orderedList")}
        active={isElementType(editor, "orderedList")}
      >
        <FormatListNumbered />
      </ToolbarButton>
      <ToolbarButton
        title="Bulleted List"
        onMouseDown={elementHandler("unorderedList")}
        active={isElementType(editor, "unorderedList")}
      >
        <FormatListBulleted />
      </ToolbarButton>
      <ToolbarButton
        title="Quote"
        onMouseDown={elementHandler("blockQuote")}
        active={isElementType(editor, "blockQuote")}
      >
        <FormatQuote />
      </ToolbarButton>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ margin: "0 10px" }}
        variant="middle"
      />

      <LinkPopover
        onInsert={(link) => {
          insertLink(editor, link);
          setAnchorEl(null);
        }}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      />

      <ToolbarButton
        title="Insert Link"
        onMouseDown={(e) => {
          e.preventDefault();
          if (isElementType(editor, "link")) {
            unwrapLink(editor);
          } else {
            setAnchorEl(e.currentTarget);
          }
        }}
        active={isElementType(editor, "link")}
      >
        <InsertLink />
      </ToolbarButton>
    </Box>
  );
};
