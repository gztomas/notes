import { RenderElementProps } from "slate-react";
import { LinkSlateElement } from "../links/LinkSlateElement";

export const renderElement = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  switch (element.type) {
    case "paragraph":
      return <p {...attributes}>{children}</p>;
    case "blockQuote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "unorderedList":
      return <ul {...attributes}>{children}</ul>;
    case "heading1":
      return <h1 {...attributes}>{children}</h1>;
    case "heading2":
      return <h2 {...attributes}>{children}</h2>;
    case "listItem":
      return <li {...attributes}>{children}</li>;
    case "orderedList":
      return <ol {...attributes}>{children}</ol>;
    case "link":
      return (
        <LinkSlateElement attributes={attributes} element={element}>
          {children}
        </LinkSlateElement>
      );
    default:
      return <span {...attributes}>{children}</span>;
  }
};
