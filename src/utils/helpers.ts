import {
  defaultGetRandomNaturalTypingPauseParams,
  defaultSegementerOptions,
  defaultStyleClassesPrefix,
  defaultStylesRegex
} from "./defaults";

export const checkArraysEqual = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  const sortedArr1 = [...arr1].sort((a,b)=>a-b);
  const sortedArr2 = [...arr2].sort((a,b)=>a-b);
  return sortedArr1.every((value, i) => value === sortedArr2[i]);
};

export const getRandomNaturalTypingPauseInMilliseconds = (
  ms = defaultGetRandomNaturalTypingPauseParams.ms,
  pow = defaultGetRandomNaturalTypingPauseParams.pow
  ): number => {
  // Use random millisecond and power distribution (skews to smaller pauses)
  // to simulate actual typing.
  const randomMS = Math.pow(Math.floor(Math.random() * ms), pow);
  return randomMS;
};

// If mode provided, then return classes string with default classes removed
// and new default mode added. If no mode is provided, then return empty string.
export const updateModeInClasses = (classes: string, mode?: string): string => {
  let newClasses = classes.replace(defaultStylesRegex, '');

  if (mode) {
    return `${defaultStyleClassesPrefix}` + mode + ' ' + newClasses;
  } else {
    return '';
  }
};

export const getNewIntlSegments = (lang: string[], textString: string): Intl.Segments => {
  const segmenter = new Intl.Segmenter(lang, defaultSegementerOptions);
  return segmenter.segment(textString);
};

export const getSupportedLocales = (l:string[]): string[] => {
  try {
    const result = Intl.Segmenter.supportedLocalesOf(l);
    return result;
  } catch (e) {
    // Error: this indicates that a language string is not supported.
    // Default to English.
    return ['en'];
  }
};

export const normalizeText = (text: string, opt: string): string => {
  return text.normalize(opt);
};

export const checkNormalizedTextEquality = (text: string): boolean => {
  return normalizeText(text, 'NFC') === normalizeText(text, 'NFD');
};

export const decomposeText = (text: string, parentKey: number): Letter[] => {
  const normalizedText = normalizeText(text, 'NFD');
  const particles = normalizedText.split('');
  const decomposedText: Letter[] = particles.map((letter) => {
    return {
      parentKey: parentKey,
      letter: letter
    }
  });
  return decomposedText;
};

export const recomposeText = (text: string[], parentKey: number): Letter => {
  const singleString = text.reduce((a,b)=>a+b, '');
  const normalizedText = singleString.normalize('NFC');
  return {
    parentKey: parentKey,
    letter: normalizedText
  };
};