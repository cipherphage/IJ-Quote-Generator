import { CSSProperties } from "react";

interface LetterSpanProps {
  letter: string;
  cursorAtEndOfLine: boolean;
  charaClass: string;
  style: CSSProperties | undefined;
}

export default function LetterSpan({
  letter,
  cursorAtEndOfLine,
  charaClass,
  style,
}: LetterSpanProps) {
  let l = letter;
  let s = <>&nbsp;&nbsp;</>;

  if (cursorAtEndOfLine) l = '';
  return <span className={charaClass} style={style}>
      {l ? l : s}
    </span>;
};