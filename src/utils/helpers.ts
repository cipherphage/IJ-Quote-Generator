import { defaultStyleClassesPrefix, defaultStylesRegex } from "./defaults";

export const checkEqualityOfArrays = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  const check1 = arr1.every((val) => arr2.includes(val));
  const check2 = arr2.every((val) => arr1.includes(val));
  return check1 && check2;
};

export const getRandomNaturalTypingPauseInMilliseconds = (ms = 20, pow = 2): number => {
  // Use random millisecond and power distribution (skews to smaller pauses)
  // to simulate actual typing.
  const randomMS = Math.pow(Math.floor(Math.random() * ms), pow);
  return randomMS;
};

// If mode provided, then return classes string with default classes removed
// and new default mode added. If no mode is provided, then return classes
// string with all default classes removed.
export const updateModeInClasses = (classes: string, mode?: string): string => {
  let newClasses = classes.replace(defaultStylesRegex, '');

  if (mode) {
    return `${defaultStyleClassesPrefix}` + mode + ' ' + newClasses;
  } else {
    return newClasses;
  }
};

export const getSupportedLocales = (l:string[]): string[] => {
  return Intl.Segmenter.supportedLocalesOf(l);
};