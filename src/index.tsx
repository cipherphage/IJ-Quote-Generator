import { useEffect, useState } from "react";
import LetterSpanner from "./components/Letters/LetterSpanner";
import { getRandomMillis, getSupportedLocales, updateModeInClasses } from "./utils/helpers";
import {
  defaultIsRepeated,
  defaultLetter,
  defaultModes 
} from "./utils/defaults";
import React from "react";

const Typer = function({ 
  text,
  id = '',
  isVisible = true,
  isPaused = false,
  customTypingOptions,
  language = 'en'
}: TyperProps) {
  const [letter, setLetter] = useState<Letter>(defaultLetter);
  const [textString, setTextString] = useState<string>('');
  const [charaCl, setCharaCl] = useState('');
  const [reset, setReset] = useState(false);
  const [key, setKey] = useState(0);
  const [isRepeated, setIsRepeated] = useState(defaultIsRepeated);
  const [lang, setLang] = useState<string | string[]>('en');
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

  // If lang option provided the check that it is supported in web api.
  useEffect(() => {
    if (language.length > 0) {
      const supportedLang = getSupportedLocales(language);
      if (supportedLang.length > 0) {
        setLang(supportedLang);
      } else {
        // TODO alert user that language string is unsupported.
      }
    }
  }, [language]);

  // Creates LetterSpans one at a time with natural typing timeout effect.
  const typeGen = function*(): Generator<void, void, boolean> {
    // const segmenter = new Intl.Segmenter((lang ? lang : 'en'), { granularity: 'grapheme' });
    // const iterator = segmenter.segment(textString)[Symbol.iterator]();

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