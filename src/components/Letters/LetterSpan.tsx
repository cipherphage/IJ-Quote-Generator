import { ReactElement } from "react";

export default function LetterSpan({
  letter,
  cursorAtEndOfLine,
  charaClass,
  testId,
}: LetterSpanProps) {
  let l: string | ReactElement = letter;

  if (cursorAtEndOfLine) {
    l = <>&nbsp;&nbsp;</>;
  }

  return <span
    data-testid={"typer-span-id-"+testId}
    className={charaClass}
    >
      {l}
    </span>;
};