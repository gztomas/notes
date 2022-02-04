import React from "react";
import { BaseText } from "slate";
import { RenderLeafProps } from "slate-react";

export interface CustomText extends BaseText {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export const renderLeaf = ({
  attributes,
  children,
  leaf,
}: RenderLeafProps): React.ReactElement => {
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

  return <span {...attributes}>{children}</span>;
};
