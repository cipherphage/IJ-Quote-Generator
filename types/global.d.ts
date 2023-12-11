export {}

declare global {
  type Letter = {
    i: number
    letter: string
  }

  type CustomTypingOptions = {
    ms: number
    pow: number
  }

  type AllowedModes = 'typewriter' |
    'negativeTypewriter' |
    'blackGreenTerminal'
}