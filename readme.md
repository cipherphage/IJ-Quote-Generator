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
  - Default: none.
  - Required.
  - The string to render with a natural typing effect.
  
- `isVisible`: 
  - Type: `boolean`.
  - Optional.
  - Default: `true`.
  - Whether the component is visible or not.

- `customTypingOptions`:
  - Type: `CustomTypingOptions`.
    - `{ ms: number, pow: number, ... }`.
  - Optional and all options are also optional.
  - Default: none.
  - Options:
    - `ms`
      - Type: `number`.
      - Optional.
      - Default: `20`.
      - Milliseconds.
    - `pow`
      - Type: `number`.
      - Optional.
      - Default: `2`.
      - The exponent to skew to shorter (greater exponent) or longer (smaller exponent) intervals.
    - `cursorAtEndOfLine`
      - Type: `boolean`.
      - Optional.
      - Default: `false` unless the built-in mode `blackGreenTerminal` is used.
      - Adds a cursor-like Span element at the end of the text.
      - Note: if set to `true` and mode `blackGreenTerminal` is not used then an unused CSS class name called `react-natural-typing-effect-cursor` is added to the cursor Span element. 
    - `blinkingCursor`
      - Type: `boolean`.
      - Optional.
      - Default: `false`.
      - Adds a blinking effect to the cursor. Only works if `cursorAtEndOfLine` is also `true`.
    - `typerCharacterClass`:
      - Type: `string | string[]`.
      - Optional.
      - Default: `''` empty string.
      - Child component (Span element) CSS classes.
    - `typerCharacterInlineStyle`:
      - Type: `CSSProperties`.
      - Optional.
      - Default: `{}` empty object.
      - Child component (Span element) CSS classes.
    - `clearBuiltinStyle`
      - Type: `boolean`.
      - Optional.
      - Default: none.
      - Removes any built-in CSS classes.
  
- `typerContainerClass`:
  - Type: `string | string[]`.
  - Optional.
  - Default: `''` empty string.
  - Parent component (Div element) CSS classes.

- `typerContainerInlineStyle`:
  - Type: `CSSProperties`.
  - Optional.
  - Default: `{}` empty object.
  - Parent component (Div element) in-line styling.

## Video of it working

TBD

