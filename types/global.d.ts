import { CSSProperties } from "react";

export {};

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

  interface TyperProps {
    id?: string;
    text: string;
    isVisible?: boolean;
    customTypingOptions?: CustomTypingOptions;
    typerContainerClass?: string | string[];
    typerContainerInlineStyle?: CSSProperties;
  }

  interface LetterSpannerProps {
    id: number;
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
    style: CSSProperties | undefined;
  }
}