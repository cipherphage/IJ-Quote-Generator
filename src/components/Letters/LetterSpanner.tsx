import { useEffect, useState } from "react";
import "./letterSpanStyles.css";
import LetterSpan from "./LetterSpan";
import { defaultModes, defaultStyleClasses } from "../../utils/defaults";
import React from "react";
import { getRandomNaturalTypingPauseInMilliseconds, recomposeText } from "../../utils/helpers";

export default function LetterSpanner({
  spannerId,
  letter,
  mode,
  cursorAtEndOfLine,
  blinkingCursor,
  charaClass,
  reset,
  childSetIsParentPaused,
}: LetterSpannerProps) {
  const [letterArray, setLetterArray] = useState<string[]>([]);
  const [decomposedTextIter, setDecomposedTextIter] =
    useState<IterableIterator<Letter> | undefined>(undefined);

  useEffect(() => {
    if (decomposedTextIter) {
      const randomMS =
        getRandomNaturalTypingPauseInMilliseconds();
      setTimeout(() => handleDecomposedText(decomposedTextIter), randomMS);
    }
  }, [letterArray, decomposedTextIter]);

  useEffect(() => {
    const isArr = Array.isArray(letter);

    if (!isArr) {
      if (spannerId === letter.parentKey) {
        const newLetterArray = [...letterArray, letter.letter];
        setLetterArray(newLetterArray);
      }
    } else if (letter.length === 1) {
      const l = letter[0];

      if (spannerId === l.parentKey) {
        const newLetterArray = [...letterArray, l.letter];
        setLetterArray(newLetterArray);
      }
    } else {
      initDecomposedTyperwriter(letter);
    }
  }, [letter]);

  useEffect(() => {
    if (reset) setLetterArray([]);
  }, [reset]);

  const initDecomposedTyperwriter = (letterObjArr: Letter[]) => {
    const letterObjIter = letterObjArr[Symbol.iterator]();
    setDecomposedTextIter(letterObjIter);
  };

  const handleDecomposedText = (letterIter: IterableIterator<Letter>) => {
    const nextIter = letterIter.next();
    if (nextIter.done) {
      setDecomposedTextIter(undefined);
      childSetIsParentPaused(false);
      return;
    }
    const nextDecomposedLetter = nextIter.value;
    const prevLetterArrayElement = letterArray.pop();
    let newLetterArray;

    if (prevLetterArrayElement) {
      const recomposedText =
        recomposeText(
          [prevLetterArrayElement, nextDecomposedLetter.letter],
          nextDecomposedLetter.parentKey
        );
      newLetterArray = [...letterArray, recomposedText.letter];
    } else {
      newLetterArray = [nextDecomposedLetter.letter];
    }

    setLetterArray(newLetterArray);
  };

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
            testId={i+letter+spannerId}
          />
          {ceol && <LetterSpan
              letter={letter}
              cursorAtEndOfLine={ceol}
              charaClass={cl}
              testId={(i+1)+letter+spannerId}
            />}
        </React.Fragment>;
      })}
    </React.Fragment>
  );
}