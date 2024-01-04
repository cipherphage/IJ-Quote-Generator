import { CSSProperties } from "react";

export {};

declare global {
  type Letter = {
    parentKey: number;
    letter: string;
  }

  type IsRepeated = {
    isRepeated: boolean;
    count: number;
    isInfinite: boolean;
  }

  type CustomTypingOptions = {
    ms?: number;
    pow?: number;
    mode?: string;
    cursorAtEndOfLine?: boolean;
    blinkingCursor?: boolean;
    isRepeated?: IsRepeated;
  }

  type LanguageOptions = {
    lang: string;
  }

  interface TyperProps {
    text: string;
    id?: string;
    isVisible?: boolean;
    isPaused?: boolean;
    customTypingOptions?: CustomTypingOptions;
    languageOptions?: LanguageOptions;
  }

  interface LetterSpannerProps {
    spannerId: number;
    letter: Letter;
    mode?: string;
    cursorAtEndOfLine?: boolean;
    blinkingCursor?: boolean;
    charaClass: string;
    reset: boolean;
    lang: string;
  }

  interface LetterSpanProps {
    letter: string;
    cursorAtEndOfLine: boolean;
    charaClass: string;
    testId: string | number;
  }
}