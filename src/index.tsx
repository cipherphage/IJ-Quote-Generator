import { useEffect, useState } from "react";
import LetterSpanner from "./components/Letters/LetterSpanner";
import {
  checkArraysEqual,
  checkNormalizedTextEquality,
  decomposeText,
  getNewIntlSegments,
  getRandomNaturalTypingPauseInMilliseconds,
  getSupportedLocales,
  updateModeInClasses
} from "./utils/helpers";
import {
  defaultIsRepeated,
  defaultLetter,
  defaultModes, 
  defaultProps
} from "./utils/defaults";
import React from "react";

const Typer = function({ 
  text,
  customTypingOptions,
  id = defaultProps.id,
  isVisible = defaultProps.isVisible,
  isPaused = defaultProps.isPaused,
  language = defaultProps.language,
}: TyperProps) {
  const [letter, setLetter] = useState<Letter | Letter[]>(defaultLetter);
  const [textString, setTextString] = useState<string>('');
  const [charaCl, setCharaCl] = useState('');
  const [reset, setReset] = useState(false);
  const [key, setKey] = useState(0);
  const [isRepeated, setIsRepeated] = useState(defaultIsRepeated);
  const [isParentPaused, setIsParentPaused] = useState(false);
  const [lang, setLang] = useState<string[]>(defaultProps.language);
  const [currentTyperGen, setCurrentTyperGen] =
    useState<Generator<void, void, boolean> | undefined>(undefined);

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
      initTyperGen();
    }
  }, [key]);

  // On each new letter, call typewriter after skewed random milliseconds (natural typing pause effect).
  useEffect(() => {
    if (textString && !isParentPaused) {
      if (currentTyperGen) {
        const randomMS =
          getRandomNaturalTypingPauseInMilliseconds(customTypingOptions?.ms, customTypingOptions?.pow);
        setTimeout(() => typewriter(currentTyperGen), randomMS);
      }
    }
  }, [letter, isParentPaused])

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

  // Handle pause prop 'isPaused'.
  useEffect(() => {
    if (isParentPaused !== isPaused) {
      setIsParentPaused(isPaused);
    }
  }, [isPaused]);

  // Handle if lang option provided, then check that it is supported in web api.
  // Default is english.
  useEffect(() => {
    if (language.length < 1) return;

    const lCheck = checkArraysEqual(lang, language);

    if (!lCheck) {
      const supportedLang = getSupportedLocales(language);
      
      if (supportedLang.length > 0) {
        setLang(supportedLang);
      } else {
        // TODO alert user that language string is unsupported.
      }
    }
  }, [language]);

  // Creates LetterSpans one at a time.
  const typerGenerator = function*(): Generator<void, void, boolean> {
    if (textString) {
      const segments = getNewIntlSegments(lang, textString);

      for (const {segment} of segments) {
        if (checkNormalizedTextEquality(segment)) {
          const newLetter: Letter = {'parentKey': key, 'letter': segment};
          setLetter(newLetter);
          yield;
        } else {
          const decompLetterArr = decomposeText(segment, key);
          setIsParentPaused(true);
          setLetter(decompLetterArr);
          yield;
        }
      }
    }
  };

  // Initialize the typewriter generator.
  const initTyperGen = (reset: boolean = false) => {
    if (reset) {
      setKey(key+1);
      setReset(true);
    }
    
    const tg = typerGenerator();
    setCurrentTyperGen(tg);
    tg.next();
  };

  // Handle each new iteration of the typewriter generator.
  const typewriter = async (ctg: Generator<void, void, boolean>) => {
    const typer = ctg?.next();

    if (typer?.done) {
      if (isRepeated.isInfinite || isRepeated.isRepeated) {
        if (!isRepeated.isInfinite && isRepeated.count === 0) {
          return;
        }
        if (!isRepeated.isInfinite && isRepeated.count > 0) {
          setIsRepeated({...isRepeated, count: isRepeated.count-1});
        }
        await new Promise(resolve =>
          setTimeout(resolve, isRepeated.msPauseBetweenRepeats));
        initTyperGen(true);
      }
    }
  };

  // Handle pausing from child component.
  const handleChildSetIsParentPaused = () => {
    setIsParentPaused(!isParentPaused);
  }

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
              cursorAtEndOfLine={
                customTypingOptions?.mode === defaultModes.bgt ? true : customTypingOptions?.cursorAtEndOfLine
              }
              blinkingCursor={customTypingOptions?.blinkingCursor}
              charaClass={charaCl}
              reset={reset}
              childSetIsParentPaused={handleChildSetIsParentPaused}
            /> 
      </div>}
    </React.Fragment>
  );
};

export default Typer;