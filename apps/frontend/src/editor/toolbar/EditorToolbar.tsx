import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  LooksOne,
  LooksTwo,
} from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { useSlate } from "slate-react";
import {
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
} from "../helpers";
import { CustomElementType, CustomText } from "../types";

export const EditorToolbar = (): React.ReactElement => {
  const editor = useSlate();

  const markHandler = (format: keyof CustomText) => (e: React.MouseEvent) => {
    e.preventDefault();
    toggleMark(editor, format);
  };
  const blockHandler = (format: CustomElementType) => (e: React.MouseEvent) => {
    e.preventDefault();
    toggleBlock(editor, format);
  };
  const markVariant = (format: keyof CustomText) =>
    isMarkActive(editor, format) ? "contained" : "outlined";
  const blockVariant = (format: CustomElementType) =>
    isBlockActive(editor, format) ? "contained" : "outlined";

  return (
    <>
      <ButtonGroup>
        <Button onMouseDown={markHandler("bold")} variant={markVariant("bold")}>
          <FormatBold />
        </Button>
        <Button
          onMouseDown={markHandler("italic")}
          variant={markVariant("italic")}
        >
          <FormatItalic />
        </Button>
        <Button
          onMouseDown={markHandler("underline")}
          variant={markVariant("underline")}
        >
          <FormatUnderlined />
        </Button>
        <Button onMouseDown={markHandler("code")} variant={markVariant("code")}>
          <Code />
        </Button>
        <Button
          onMouseDown={blockHandler("heading1")}
          variant={blockVariant("heading1")}
        >
          <LooksOne />
        </Button>
        <Button
          onMouseDown={blockHandler("heading2")}
          variant={blockVariant("heading2")}
        >
          <LooksTwo />
        </Button>
        <Button
          onMouseDown={blockHandler("blockQuote")}
          variant={blockVariant("blockQuote")}
        >
          <FormatQuote />
        </Button>
        <Button
          onMouseDown={blockHandler("orderedList")}
          variant={blockVariant("orderedList")}
        >
          <FormatListNumbered />
        </Button>
        <Button
          onMouseDown={blockHandler("unorderedList")}
          variant={blockVariant("unorderedList")}
        >
          <FormatListBulleted />
        </Button>
      </ButtonGroup>
    </>
  );
};
