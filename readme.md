# React-Natural-Typing-Effect

## About
This is a very simple and small React/Typescript component library made to display a string's characters as Span elements within a Div element using a natural-feeling typing animation that is straight-forwardly configurable and stylable.


## Usage

In your terminal: <br/>
`npm install --save react-natural-typing-effect`

In your code:
```javascript
<Typer text="This text will be typed." />
```

## Props

- `text`: 
  - Type: `string`.
  - Required.
  
- `isLoading`: 
  - Type: `boolean`.
  - Optional.
  - Default: `false`.

- `customTypingOptions`:
  - Type: `CustomTypingOptions`.
    - `{ ms: number, pow: number }`.
  - Optional.
  - Default: `{ ms: 20, pow: 2 }`. "ms" is milliseconds, "pow" is the exponent to skew to shorter or longer intervals.
  
- `typerContainerClasses`:
  - Type: `string | string[]`.
  - Optional.
  - Default: `''` empty string.

- `typerCharacterClasses`: 
  - Type: `string | string[]`.
  - Optional.
  - Default: `'react-natural-typing-typewriter'`.

- `mode`:
  - Type: string literal: `'typewriter' | 'negativeTypewriter' | 'blackGreenTerminal'`.
  - Optional.
  - Default: `typewriter`.

## Video of it working

[https://github.com/cipherphage/IJ-Quote-Generator/blob/main/RandomIJQuotesTypewriterEffect.mov](https://github.com/cipherphage/IJ-Quote-Generator/blob/main/RandomIJQuotesTypewriterEffect.mov)

