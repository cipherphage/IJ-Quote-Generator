import { render } from '@testing-library/react';

import Typer from './index';
import { defaultStyleClasses } from './utils/defaults';
import LetterSpanner from './components/Letters/LetterSpanner';
import LetterSpan from './components/Letters/LetterSpan';

const testText = "This gets typed, let's make it long so some of it gets rendered during the test.";
const testCustomTypingOptions: CustomTypingOptions = {
  mode: "typewriter"
};

// Typer component tests.
describe('Typer component tests', function() {
  it('should render Typer component with text provided', () => {
    const { queryByTestId, queryAllByTestId } = render(<Typer text={testText} />);
    
    const typer = queryByTestId('typer-cont-id');
    const typerChildren = queryAllByTestId(/^typer-span-id-/);
    
    expect(typer).toBeInTheDocument();
    // This next test of textContent is assuming the above render method gets the first
    // letter of the text rendered. So far this has always been the case.
    expect(typer?.textContent?.includes('T')).toStrictEqual(true);
    expect(typerChildren[0]).toBeInTheDocument();
    expect(typerChildren.length > 0).toStrictEqual(true);
  });

  it('should render Typer component with empty string provided', () => {
    const { queryByTestId } = render(<Typer text="" />);
    
    const typer = queryByTestId('typer-cont-id');
    
    expect(typer).toBeInTheDocument();
    expect(typer?.textContent).toStrictEqual('');
    expect(typer?.children.length === 0).toStrictEqual(true);
  });

  it('should render Typer component with a built-in mode provided', () => {
    const { queryByTestId, queryAllByTestId } =
      render(<Typer text={testText} customTypingOptions={testCustomTypingOptions} />);
    
    const typer = queryByTestId('typer-cont-id');
    const typerChildren = queryAllByTestId(/^typer-span-id-/);
    
    expect(typer).toBeInTheDocument();
    expect(typerChildren[0]).toBeInTheDocument();
    expect(typerChildren.length > 0).toStrictEqual(true);
    expect(typerChildren[0].className).toStrictEqual(defaultStyleClasses.t+' ');
  });

  it('should not render Typer component when isVisible prop false is provided', () => {
    const { queryByTestId } = render(<Typer text={testText} isVisible={false} />);
    
    expect(queryByTestId(/typer-cont-id/i)).toBeNull();
  });

  it('should render Typer component with an ID attribute prop provided', () => {
    const { queryByTestId } = render(<Typer text={testText} id="custom-id-test" />);
    
    const typer = queryByTestId('typer-cont-id');
    
    expect(typer).toBeInTheDocument();
    expect(typer?.id).toEqual('custom-id-test');
  });
});

// LetterSpanner component tests.
describe('LetterSpanner component tests', function() {
  it('should render LetterSpanner component with letter a', () => {
    const { queryByTestId } = render(
      <LetterSpanner
        key={1+'-typerlspanner'}
        spannerId={1}
        letter={{parentKey: 1, letter: 'a'}}
        charaClass={''}
        reset={false}
        childSetIsParentPaused={()=>{}}
      />
    );

    const letterSpanner = queryByTestId(/0a1/i);
    
    expect(letterSpanner).toBeInTheDocument();
    expect(letterSpanner).toBeInstanceOf(HTMLSpanElement);
    expect(letterSpanner).toHaveTextContent('a');
  });

  it('should render LetterSpanner component with default mode className', () => {
    const { queryByTestId } = render(
      <LetterSpanner
        key={1+'-typerlspanner'}
        spannerId={1}
        letter={{parentKey: 1, letter: 'a'}}
        charaClass={defaultStyleClasses.t+' '}
        reset={false}
        childSetIsParentPaused={()=>{}}
      />
    );

    const letterSpanner = queryByTestId(/0a1/i);
    
    expect(letterSpanner).toHaveClass(defaultStyleClasses.t+' ');
  });

  it('should not render LetterSpanner component when reset prop is true', () => {
    const { queryByTestId } = render(
      <LetterSpanner
        key={1+'-typerlspanner'}
        spannerId={1}
        letter={{parentKey: 1, letter: 'a'}}
        charaClass={''}
        reset={true}
        childSetIsParentPaused={()=>{}}
      />
    );

    const letterSpanner = queryByTestId(/0a1/i);
    
    expect(letterSpanner).toBeNull();
  });

  it('should render LetterSpanner component with blinking cursor', () => {
    const { queryByTestId } = render(
      <LetterSpanner
        key={1+'-typerlspanner'}
        spannerId={1}
        letter={{parentKey: 1, letter: 'a'}}
        cursorAtEndOfLine={true}
        blinkingCursor={true}
        charaClass={''}
        reset={false}
        childSetIsParentPaused={()=>{}}
      />
    );

    const letterSpanner1 = queryByTestId(/0a1/i);
    const letterSpanner2 = queryByTestId(/1a1/i);
    
    expect(letterSpanner1).toHaveTextContent('a');
    expect(letterSpanner1?.className).toBeFalsy();
    expect(letterSpanner2).toHaveTextContent('');
    expect(letterSpanner2).toHaveClass(defaultStyleClasses.blinkingCursor);
  });
});

// LetterSpan component tests.
describe('LetterSpan component tests', function() {
  it('should render LetterSpan component Span element', () => {
    const { queryByTestId } = render(
      <LetterSpan
        letter={'a'}
        cursorAtEndOfLine={false}
        charaClass={''}
        testId={'0a1'}
      />
    );

    const letterSpanner = queryByTestId(/0a1/i);
    
    expect(letterSpanner).toHaveTextContent('a');
    expect(letterSpanner?.className).toBeFalsy();
  });

  it('should render LetterSpanner component Span element with cursor class', () => {
    const { queryByTestId } = render(
      <LetterSpan
        letter={''}
        cursorAtEndOfLine={true}
        charaClass={defaultStyleClasses.blinkingCursor}
        testId={'0a1'}
      />
    );

    const letterSpanner = queryByTestId(/0a1/i);
    
    expect(letterSpanner).toHaveTextContent('');
    expect(letterSpanner).toHaveClass(defaultStyleClasses.blinkingCursor);
  });
});