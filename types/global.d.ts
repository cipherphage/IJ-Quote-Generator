import { CSSProperties } from "react";

export {};

declare global {
  type Letter = {
    parentKey: number
    letter: string
  }

  type IsRepeated = {
    isRepeated: boolean
    count: number
    isInfinite: boolean
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
    isRepeated?: IsRepeated
  }

  interface TyperProps {
    text: string;
    isVisible?: boolean;
    isPaused?: boolean;
    customTypingOptions?: CustomTypingOptions;
    typerContainerClass?: string | string[];
    typerContainerInlineStyle?: CSSProperties;
  }

  interface LetterSpannerProps {
    spannerId: number;
    letter: Letter;
    mode?: string;
    cursorAtEndOfLine?: boolean;
    blinkingCursor?: boolean;
    charaClass: string;
    reset: boolean;
    style?: CSSProperties;
  }

  interface LetterSpanProps {
    letter: string;
    cursorAtEndOfLine: boolean;
    charaClass: string;
    style?: CSSProperties;
    testId: string | number;
  }
}