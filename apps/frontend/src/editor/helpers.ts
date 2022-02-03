import { Editor, Transforms, Element as SlateElement } from 'slate'
import isHotkey from 'is-hotkey'
import { KeyboardEvent } from 'react'
import { CustomElementType } from './CustomElement'
import { CustomText } from './CustomLeaf'

const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const toggleBlock = (editor: Editor, format: CustomElementType): void => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type as any // eslint-disable-line @typescript-eslint/no-explicit-any
      ),
    split: true,
  })
  const newProperties: Partial<SlateElement> = {
    type: isActive ? CustomElementType.paragraph : isList ? CustomElementType.listItem : format,
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

export const toggleMark = (editor: Editor, format: keyof CustomText): void => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const isBlockActive = (editor: Editor, format: CustomElementType): boolean => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })

  return !!match
}

export const isMarkActive = (editor: Editor, format: keyof CustomText): boolean => {
  const marks = Editor.marks(editor)
  return marks ? format in marks === true : false
}

const HOTKEYS: Record<string, keyof CustomText> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

export const handleHotkeys = (editor: Editor) => (event: KeyboardEvent<HTMLDivElement>): void => {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault()
      const mark = HOTKEYS[hotkey]
      toggleMark(editor, mark)
    }
  }
}