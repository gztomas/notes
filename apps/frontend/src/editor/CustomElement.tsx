import React from 'react'
import { BaseElement } from 'slate'
import { RenderElementProps } from 'slate-react'

export enum CustomElementType {
  blockQuote = 'block-quote',
  bulletedList = 'bulleted-list',
  headingOne = 'heading-one',
  headingTwo = 'heading-two',
  listItem = 'list-item',
  numberedList = 'numbered-list',
  paragraph = 'paragraph',
}

export interface CustomElement extends BaseElement {
  type: CustomElementType
}

export const CustomElement: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  switch (element.type) {
    case CustomElementType.blockQuote:
      return <blockquote {...attributes}>{children}</blockquote>
    case CustomElementType.bulletedList:
      return <ul {...attributes}>{children}</ul>
    case CustomElementType.headingOne:
      return <h1 {...attributes}>{children}</h1>
    case CustomElementType.headingTwo:
      return <h2 {...attributes}>{children}</h2>
    case CustomElementType.listItem:
      return <li {...attributes}>{children}</li>
    case CustomElementType.numberedList:
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}