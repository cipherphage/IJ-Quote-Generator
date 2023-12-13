import { CSSProperties, useEffect, useState } from "react";
import "./letterSpanStyles.css";
import LetterSpan from "./LetterSpan";
import { defaultModes, defaultStyleClasses } from "../../utils/defaults";

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

export default function LetterSpanner({
  id,
  letter,
  mode,
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
            cl = (mode === defaultModes.bgt) ?
              defaultStyleClasses.bgtBlinkingCursor :
              defaultStyleClasses.blinkingCursor;
          } else {
            cl = (mode === defaultModes.bgt) ?
              defaultStyleClasses.bgtCursor :
              defaultStyleClasses.cursor;
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