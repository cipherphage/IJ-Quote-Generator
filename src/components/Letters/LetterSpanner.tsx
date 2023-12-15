import { useEffect, useState } from "react";
import "./letterSpanStyles.css";
import LetterSpan from "./LetterSpan";
import { defaultModes, defaultStyleClasses } from "../../utils/defaults";
import React from "react";

export default function LetterSpanner({
  spannerId,
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
    if (spannerId === letter.key) {
      const newLetterArray = [...letterArray, letter.letter];
      setLetterArray(newLetterArray);
    }
  }, [letter]);

  useEffect(() => {
    if (reset) setLetterArray([]);
  }, [reset]);

  return (
    <React.Fragment key={spannerId+'typerlspannercontainer'}>
      {letterArray.map((letter, i) => {
        let cl = '';
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
        
        return <React.Fragment key={i+letter+'lspan'+spannerId}>
          <LetterSpan
            letter={letter}
            cursorAtEndOfLine={false}
            charaClass={charaClass}
            style={style} 
          />
          {ceol && <LetterSpan
              letter={letter}
              cursorAtEndOfLine={ceol}
              charaClass={cl}
              style={style} 
            />}
        </React.Fragment>;
      })}
    </React.Fragment>
  );
}