import { useEffect, useState } from "react";
import LetterSpanner from "./components/Letters/LetterSpanner";
import { typerPauseRandom, updateModeInClasses } from "./utils/helpers";
import { defaultLetter, defaultModes } from "./utils/defaults";
import React from "react";

const Typer = function({ 
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
    if (text !== textString) {
      setTextString(text);
      setReset(true);
    }
  }, [text]);

  useEffect(() => {
    if (textString) {
      setKey(key+1);
    }
  }, [textString]);

  useEffect(() => {
    if (textString) {
      typewriter(key, customTypingOptions);
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
      if (charaCl.indexOf(customTypingOptions.mode) === -1) {
        const newCl = updateModeInClasses(charaCl, customTypingOptions?.mode);
        setCharaCl(newCl);
      }
    }

    if (customTypingOptions?.clearBuiltinStyle) {
      if (customTypingOptions.clearBuiltinStyle) {
        const newCl = updateModeInClasses(ccl);
        setCharaCl(newCl);
      }
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
  const typewriter = async (key: number, tparams: CustomTypingOptions | undefined) => {
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
    <React.Fragment key={key+'-typercontainer'} >
      {isVisible &&  <div
        data-testid="typer-cont-id"
        className={ccl}
        style={typerContainerInlineStyle} >
          <LetterSpanner
              key={key+'-typerlspanner'}
              spannerId={key}
              letter={letter}
              mode={customTypingOptions?.mode}
              cursorAtEndOfLine={customTypingOptions?.mode === defaultModes.bgt ? true : customTypingOptions?.cursorAtEndOfLine}
              blinkingCursor={customTypingOptions?.blinkingCursor}
              charaClass={charaCl}
              reset={reset} 
              style={customTypingOptions?.typerCharacterInlineStyle}
            /> 
      </div>}
    </React.Fragment>
  );
};

export default Typer;