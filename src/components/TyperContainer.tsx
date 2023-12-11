import { useEffect, useState } from "react";
import LetterSpanner from "./Letters/LetterSpanner";
import { typerPauseRandom, updateModeInClasses } from "../utils/helpers";
import { defaultLetter } from "../utils/defaults";

interface TyperProps {
  text: string;
  isLoading?: boolean;
  customTypingOptions?: CustomTypingOptions;
  typerContainerClasses?: string | string[];
  typerCharacterClasses?: string | string[];
  mode?: AllowedModes;
}

export default function NaturalTyper({ 
  text,
  isLoading = false,
  customTypingOptions = {ms:20,pow:2},
  typerContainerClasses = '',
  typerCharacterClasses = '',
  mode = 'blackGreenTerminal'
}: TyperProps) {
  const [letter, setLetter] = useState<Letter>(defaultLetter);
  const [textString, setTextString] = useState<string>('');
  const [ccl, setCcl] = useState('');
  const [charaCl, setCharaCl] = useState('');
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if ((text !== textString) && !isLoading) {
      setTextString(text);
      setReset(true);
    }
  }, [text]);

  useEffect(() => {
    if (!isLoading && textString) {
      typewriter(customTypingOptions);
    }
  }, [textString])

  useEffect(() => {
    if (Array.isArray(typerContainerClasses)) {
      setCcl(typerContainerClasses.join(' '));
    } else {
      setCcl(typerContainerClasses);
    }

    if (Array.isArray(typerCharacterClasses)) {
      setCharaCl(typerCharacterClasses.join(' '));
    } else {
      setCharaCl(typerCharacterClasses);
    }
  }, [typerContainerClasses, typerCharacterClasses]);

  useEffect(() => {
    const newCl = updateModeInClasses(charaCl, mode);
    setCharaCl(newCl);
  }, [mode]);

  // Creates LetterSpans one at a time with typing timeout effect.
  const typewriter = async (tparams: CustomTypingOptions) => {
    const t = text.split('');
    for (let i = 0; i < t.length; i++) {
      await typerPauseRandom(tparams.ms, tparams.pow);
      const newLetter: Letter = {'i': i, 'letter': t[i]};
      setLetter(newLetter);
    }
  };

  return (
    <>
      {!isLoading &&  <div className={ccl}>
        <LetterSpanner letter={letter} isTerminalMode={mode==='blackGreenTerminal'?true:false} charaClass={charaCl} reset={reset} />
      </div>}
    </>
  );
}