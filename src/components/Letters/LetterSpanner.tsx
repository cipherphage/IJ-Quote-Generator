import { useEffect, useState } from "react";
import "./letterSpanStyles.css";
import LetterSpan from "./LetterSpan";

interface LetterSpannerProps {
  letter: Letter;
  charaClass: string;
  reset: boolean;
  isTerminalMode: boolean;
}

export default function LetterSpanner({
  letter,
  charaClass,
  reset,
  isTerminalMode
}: LetterSpannerProps) {
  const [letterArray, setLetterArray] = useState<string[]>([]);

  useEffect(() => {
    const newLetterArray = [...letterArray, letter.letter];
    setLetterArray(newLetterArray);
  }, [letter]);

  useEffect(() => {
    if (reset) setLetterArray([]);
  }, [reset]);

  return (
    <>
      {letterArray.map((letter, i) => {
        let cl = charaClass;
        let tm = false;

        if ((i === letterArray.length-1) && isTerminalMode) {
          cl = 'react-natural-typing-effect-blackGreenTerminal-cursor';
          tm = true;
        }
        
        return <LetterSpan
          key={i+letter+'-r-natural-typing-effect-ls'}
          letter={letter}
          charaClass={cl}
          isTerminalMode={tm} />;
      })}
    </>
  );
}