import { CSSProperties, useEffect, useState } from "react";
import LetterSpanner from "./Letters/LetterSpanner";
import { typerPauseRandom, updateModeInClasses } from "../utils/helpers";
import { defaultLetter } from "../utils/defaults";

interface TyperProps {
  id?: string;
  text: string;
  isVisible?: boolean;
  customTypingOptions?: CustomTypingOptions;
  typerContainerClass?: string | string[];
  typerContainerInlineStyle?: CSSProperties;
}

export default function NaturalTyper({
  id = 'react-natural-typing-effect-container', 
  text,
  isVisible = true,
  customTypingOptions,
  typerContainerClass = '',
  typerContainerInlineStyle = {}
}: TyperProps) {
  const [letter, setLetter] = useState<Letter>(defaultLetter);
  const [textString, setTextString] = useState<string>('');
  const [ccl, setCcl] = useState('');
  const [charaCl, setCharaCl] = useState('');
  const [reset, setReset] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if ((text !== textString) && isVisible) {
      setTextString(text);
      setReset(true);
    }
  }, [text]);

  useEffect(() => {
    if (isVisible && textString) {
      setKey(key+1);
    }
  }, [textString]);

  useEffect(() => {
    if (isVisible && textString) {
      typewriter(customTypingOptions);
    }
  }, [key])

  useEffect(() => {
    if (Array.isArray(typerContainerClass)) {
      setCcl(typerContainerClass.join(' '));
    } else {
      setCcl(typerContainerClass);
    }
  }, [typerContainerClass]);

  useEffect(() => {
    if (customTypingOptions?.mode) {
      if (ccl.indexOf(customTypingOptions.mode) === -1) {
        const newCl = updateModeInClasses(ccl, customTypingOptions?.mode);
        setCcl(newCl);
      }
    }

    if (customTypingOptions?.clearBuiltinStyle) {
      const newCl = updateModeInClasses(ccl);
      setCcl(newCl);
    }

    if (customTypingOptions?.typerCharacterClass && (charaCl !== customTypingOptions?.typerCharacterClass)) {
      if (Array.isArray(customTypingOptions?.typerCharacterClass)) {
        setCharaCl(customTypingOptions?.typerCharacterClass.join(' '));
      } else {
        setCharaCl(customTypingOptions?.typerCharacterClass);
      }
    }
  }, [customTypingOptions]);

  // Creates LetterSpans one at a time with natural typing timeout effect.
  const typewriter = async (tparams: CustomTypingOptions | undefined) => {
    const t = textString.split('');

    if (t.length) {
      for (let i = 0; i < t.length; i++) {
        await typerPauseRandom(tparams?.ms, tparams?.pow);
        const newLetter: Letter = {'key': key, 'letter': t[i]};
        setLetter(newLetter);
      }
    }
  };

  return (
    <>
      {isVisible &&  <div id={id} className={ccl} style={typerContainerInlineStyle}>
          <LetterSpanner
              key={key}
              id={key}
              letter={letter}
              mode={customTypingOptions?.mode}
              cursorAtEndOfLine={customTypingOptions?.cursorAtEndOfLine}
              blinkingCursor={customTypingOptions?.blinkingCursor}
              charaClass={charaCl}
              reset={reset} 
              style={customTypingOptions?.typerCharacterInlineStyle}
            /> 
      </div>}
    </>
  );
}