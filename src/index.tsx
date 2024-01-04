import { useEffect, useState } from "react";
import LetterSpanner from "./components/Letters/LetterSpanner";
import { getRandomMillis, updateModeInClasses } from "./utils/helpers";
import { defaultIsRepeated, defaultLetter, defaultModes } from "./utils/defaults";
import React from "react";

const Typer = function({ 
  text,
  id = '',
  isVisible = true,
  isPaused = false,
  customTypingOptions,
  languageOptions
}: TyperProps) {
  const [letter, setLetter] = useState<Letter>(defaultLetter);
  const [textString, setTextString] = useState<string>('');
  const [charaCl, setCharaCl] = useState('');
  const [reset, setReset] = useState(false);
  const [key, setKey] = useState(0);
  const [isRepeated, setIsRepeated] = useState(defaultIsRepeated);
  const [lang, setLang] = useState('');
  const [gen, setGen] = useState<Generator<void, void, boolean> | undefined>(undefined);

  // Initialize the typewriter generator.
  const initTypeGen = (reset: boolean = false) => {
    if (reset) {
      setKey(key+1);
      setReset(true);
    }
    const tg = typeGen();
    setGen(tg);
    tg.next();
  };

  // Handle each new iteration of the typewriter generator.
  const typewriter = () => {
    const typer = gen?.next();

    if (typer?.done) {
      if (isRepeated.isInfinite || isRepeated.isRepeated) {
        if (isRepeated.count === 0) {
          return;
        }
        if (!isRepeated.isInfinite && isRepeated.count > 0) {
          setIsRepeated({...isRepeated, count: isRepeated.count-1});
        }
        initTypeGen(true);
      }
    }
  };
  // On new text prop, trigger reset.
  useEffect(() => {
    if (text !== textString) {
      setTextString(text);
      setReset(true);
    }
  }, [text]);

  // On new TextString, set a new key.
  useEffect(() => {
    if (textString) {
      setKey(key+1);
      setReset(false);
    }
  }, [textString]);

  // On new key, set a new typewriter generator.
  useEffect(() => {
    if (textString) {
      initTypeGen();
    }
  }, [key]);

  // On each new letter, call typewriter (calls generator's next method).
  useEffect(() => {
    if (textString && !isPaused) {
      if (gen) {
        const randomMS = getRandomMillis(customTypingOptions?.ms, customTypingOptions?.pow);
        setTimeout(typewriter, randomMS);
      }
    }
  }, [letter, isPaused])

  // Handle custom typing options 'mode' and 'isRepeated'.
  useEffect(() => {
    if (customTypingOptions?.mode) {
      if (charaCl.indexOf(customTypingOptions.mode) === -1) {
        const newCl = updateModeInClasses(charaCl, customTypingOptions?.mode);
        setCharaCl(newCl);
      }
    }

    if(customTypingOptions?.isRepeated) {
      setIsRepeated(customTypingOptions.isRepeated);
    }
  }, [customTypingOptions]);

  // If lang option provided the check allowed list, if valid then set lang state,
  // else set lang to falsey empty string.
  useEffect(() => {
    if (languageOptions?.lang) {
      const langArr = languageOptions.lang.split(':');
      if (allowedLanguages[langArr[0]]) {
        if (allowedLanguages[langArr[0]].includes(langArr[1])) {
          setLang(languageOptions.lang);
          return;
        }
      }
    }
    setLang('');
  }, [languageOptions]);

  // Creates LetterSpans one at a time with natural typing timeout effect.
  const typeGen = function*(): Generator<void, void, boolean> {
    if (textString) {
      let i = 0;
      let t = textString.split('');

      while (i < t.length) {
        const newLetter: Letter = {'parentKey': key, 'letter': t[i]};
        setLetter(newLetter);
        i++;
        yield;
      }
    }
  };

  return (
    <React.Fragment key={key+'-typercontainer'} >
      {isVisible &&  <div
        id={id}
        data-testid="typer-cont-id">
          <LetterSpanner
              key={key+'-typerlspanner'}
              spannerId={key}
              letter={letter}
              mode={customTypingOptions?.mode}
              cursorAtEndOfLine={customTypingOptions?.mode === defaultModes.bgt ? true : customTypingOptions?.cursorAtEndOfLine}
              blinkingCursor={customTypingOptions?.blinkingCursor}
              charaClass={charaCl}
              reset={reset}
              lang={lang}
            /> 
      </div>}
    </React.Fragment>
  );
};

export default Typer;