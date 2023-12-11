export const typerPauseRandom = async (ms = 20, pow = 2) => {
  // Use random millisecond and power distribution (thus skewing to smaller pauses)
  // to simulate actual typing.
  const randomMS = Math.pow(Math.floor(Math.random() * ms), pow);
  const timeout = new Promise((resolve) => setTimeout(resolve, randomMS));
  return timeout;
};

export const updateModeInClasses = (classes: string, mode: AllowedModes) => {
  classes.replace(/react-natural-typing-effect-typewriter/g, '');
  classes.replace(/react-natural-typing-effect-negativeTypewriter/g, '');
  classes.replace(/react-natural-typing-effect-blackGreenTerminal/g, '');
  return 'react-natural-typing-' + mode + ' ' + classes;
};