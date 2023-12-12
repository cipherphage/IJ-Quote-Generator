import { CSSProperties } from "react"

export {}

declare global {
  type Letter = {
    key: number
    letter: string
  }

  type CustomTypingOptions = {
    ms?: number
    pow?: number
    mode?: string
    cursorAtEndOfLine?: boolean
    blinkingCursor?: boolean
    typerCharacterClass?: string | string[]
    typerCharacterInlineStyle?: CSSProperties
    clearBuiltinStyle?: boolean
  }
}