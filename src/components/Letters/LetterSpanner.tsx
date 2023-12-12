import { CSSProperties, StyleHTMLAttributes, useEffect, useState } from "react";
import "./letterSpanStyles.css";
import LetterSpan from "./LetterSpan";
import { defaultStyleClasses } from "../../utils/defaults";

interface LetterSpannerProps {
  id: number;
  letter: Letter;
  cursorAtEndOfLine: boolean | undefined;
  blinkingCursor: boolean | undefined;
  charaClass: string;
  reset: boolean;
  style: CSSProperties | undefined;
}

export default function LetterSpanner({
  id,
  letter,
  cursorAtEndOfLine,
  blinkingCursor,
  charaClass,
  reset,
  style
}: LetterSpannerProps) {
  const [letterArray, setLetterArray] = useState<string[]>([]);

  useEffect(() => {
    if (id === letter.key) {
      const newLetterArray = [...letterArray, letter.letter];
      setLetterArray(newLetterArray);
    }
  }, [letter]);

  useEffect(() => {
    if (reset) setLetterArray([]);
  }, [reset]);

  return (
    <>
      {letterArray.map((letter, i) => {
        let cl = charaClass;
        let ceol = false;

        if ((i === letterArray.length-1) && cursorAtEndOfLine) {
          ceol = true;
          if (blinkingCursor) {
            cl = defaultStyleClasses.bgtBlinkingCursor;
          } else {
            cl = defaultStyleClasses.bgtCursor;
          }
          
        }
        
        return <LetterSpan
          key={i+letter+'-r-natural-typing-effect-ls'}
          letter={letter}
          cursorAtEndOfLine={ceol}
          charaClass={cl}
          style={style} 
        />;
      })}
    </>
  );
}