import { RenderLeafProps } from "slate-react";
import { CaretLeaf } from "./collaboration/CaretLeaf";

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

  return (
    <span {...attributes} style={{ backgroundColor: leaf.alphaColor }}>
      {leaf.isCaret ? <CaretLeaf {...leaf} /> : null}
      {children}
    </span>
  );
};
