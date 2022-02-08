import { Launch } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import { RenderElementProps } from "slate-react";
import { LinkElement } from "../editor/elements";

interface LinkSlateElementProps {
  attributes: RenderElementProps["attributes"];
  element: LinkElement;
  children: React.ReactNode;
}

export const LinkSlateElement = ({
  attributes,
  children,
  element,
}: LinkSlateElementProps) => {
  return (
    <Tooltip
      color="white"
      title={
        <Box
          component="a"
          href={element.url}
          target="_blank"
          rel="noreferrer"
          sx={{
            color: "white",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {element.url}
          <Launch fontSize="small" />
        </Box>
      }
    >
      <a {...attributes} href={element.url ?? undefined}>
        {children}
      </a>
    </Tooltip>
  );
};
