import { defaultStyleClassesPrefix, defaultStylesRegex } from "./defaults";

export const typerPauseRandom = async (ms = 20, pow = 2) => {
  // Use random millisecond and power distribution (thus skewing to smaller pauses)
  // to simulate actual typing.
  const randomMS = Math.pow(Math.floor(Math.random() * ms), pow);
  const timeout = new Promise((resolve) => setTimeout(resolve, randomMS));
  return timeout;
};

// If mode provided, then return classes string with default classes removed
// and new default mode added. If no mode is provided, then return classes
// string with all default classes removed.
export const updateModeInClasses = (classes: string, mode?: string) => {
  let newClasses = classes.replace(defaultStylesRegex, '');

  if (mode) {
    return `${defaultStyleClassesPrefix}` + mode + ' ' + newClasses;
  } else {
    return newClasses;
  }
};