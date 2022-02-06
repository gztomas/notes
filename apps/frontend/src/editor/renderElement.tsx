import { RenderElementProps } from "slate-react";
import { Link } from "./links/Link";

export const renderElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
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
        <Link attributes={attributes} element={element}>
          {children}
        </Link>
      );
    default:
      return <span {...attributes}>{children}</span>;
  }
};
