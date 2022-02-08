import { RenderLeafProps } from "slate-react";
import { TheirCaret } from "../collaboration/TheirCaret";
import { hasCaretMark } from "./marks";

export const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (hasCaretMark(leaf)) {
    return (
      <span {...attributes} style={{ backgroundColor: leaf.alphaColor }}>
        <TheirCaret {...leaf} />
        {children}
      </span>
    );
  } else {
    return <span {...attributes}>{children}</span>;
  }
};
