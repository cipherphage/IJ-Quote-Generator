import { render, screen } from '@testing-library/react';

import Typer from './index';
import { defaultStyleClasses } from './utils/defaults';
import LetterSpanner from './components/Letters/LetterSpanner';

const testText = "This gets typed, let's make it long so some of it gets rendered during the test.";
const testCustomTypingOptions: CustomTypingOptions = {
  mode: "typewriter"
};

// Typer component tests.
describe('Typer component tests', function() {
  it('should render Typer component with text provided', async () => {
    render(<Typer text={testText} />);
    
    const typer = await screen.findByTestId('typer-cont-id');
    const typerChildren = await screen.findAllByTestId(/^typer-span-id-/);
    
    expect(typer).toBeInTheDocument();
    expect(typerChildren[0]).toBeInTheDocument();
    expect(typerChildren.length > 0).toStrictEqual(true);
  });

  it('should render Typer component with empty string provided', async () => {
    render(<Typer text="" />);
    
    const typer = await screen.findByTestId('typer-cont-id');
    
    expect(typer).toBeInTheDocument();
    expect(typer.children.length === 0).toStrictEqual(true);
  });

  it('should render Typer component with a built-in mode provided', async () => {
    render(<Typer text={testText} customTypingOptions={testCustomTypingOptions} />);
    
    const typer = await screen.findByTestId('typer-cont-id');
    const typerChildren = await screen.findAllByTestId(/^typer-span-id-/);
    
    expect(typer).toBeInTheDocument();
    expect(typerChildren[0]).toBeInTheDocument();
    expect(typerChildren.length > 0).toStrictEqual(true);
    expect(typerChildren[0].className).toStrictEqual(defaultStyleClasses.t+' ');
  });

  it('should not render Typer component when isVisible prop false is provided', () => {
    const { queryByTestId } = render(<Typer text={testText} isVisible={false} />);
    
    expect(queryByTestId(/typer-cont-id/i)).toBeNull();
  });

  it('should render Typer component with an ID attribute prop provided', async () => {
    render(<Typer text={testText} id="custom-id-test" />);
    
    const typer = await screen.findByTestId('typer-cont-id');
    
    expect(typer).toBeInTheDocument();
    expect(typer.id).toEqual('custom-id-test');
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

  it('should not render LetterSpanner component', () => {
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

  // it('should not render LetterSpanner component', () => {
  //   const { queryByTestId } = render(
  //     <LetterSpanner
  //       key={1+'-typerlspanner'}
  //       spannerId={1}
  //       letter={{parentKey: 1, letter: 'a'}}
  //       mode={}
  //       cursorAtEndOfLine={false}
  //       blinkingCursor={false}
  //       charaClass={''}
  //       reset={true}
  //       childSetIsParentPaused={()=>{}}
  //     />
  //   );

  //   const letterSpanner = queryByTestId(/0a1/i);
    
  //   expect(letterSpanner).toBeNull();
  // });
});

// LetterSpan component tests.
// describe('LetterSpan component tests', function() {
// });