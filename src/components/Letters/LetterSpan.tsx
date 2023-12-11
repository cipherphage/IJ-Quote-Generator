interface LetterSpanProps {
  letter: string;
  charaClass: string;
  isTerminalMode: boolean;
}

export default function LetterSpan({
  letter,
  charaClass,
  isTerminalMode
}: LetterSpanProps) {
  let l = letter;
  let s = <>&nbsp;&nbsp;</>;

  if (isTerminalMode) l = '';

  return <span className={charaClass}>
      {l ? l : s}
    </span>;
};