import { render, screen } from '@testing-library/react';

import Typer from './index';
import { defaultStyleClasses } from './utils/defaults';
import { CSSProperties } from 'react';

const testText = "This gets typed, let's make it long so some of it gets rendered during the test.";
const testCustomTypingOptions: CustomTypingOptions = {
  mode: "typewriter"
};
const testContainerClass = "my-test-class";
const testContainerInlineStyle: CSSProperties = {
  textAlign: "right"
};
const testLetterSpanClass: CustomTypingOptions = {
  typerCharacterClass: "my-test-character-class"
};
const testLetterSpanInlineStyle: CustomTypingOptions = {
  typerCharacterInlineStyle: {
    textAlign: "left"
  }
};
const testClearDefaultStylesV1: CustomTypingOptions = {
  mode: "typewriter",
  clearBuiltinStyle: true
};
const testClearDefaultStylesV2: CustomTypingOptions = {
  mode: "typewriter"
};

describe('Component tests', function() {
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

  it('should render Typer component with container classes provided', async () => {
    render(<Typer text={testText} typerContainerClass={testContainerClass} />);
    
    const typer = await screen.findByTestId('typer-cont-id');
    
    expect(typer).toBeInTheDocument();
    expect(typer.className).toStrictEqual(testContainerClass);
  });

  it('should render Typer component with style objects provided', async () => {
    render(<Typer text={testText} typerContainerInlineStyle={testContainerInlineStyle} />);
    
    const typer = await screen.findByTestId('typer-cont-id');
    
    expect(typer).toBeInTheDocument();
    expect(typer.style.textAlign).toStrictEqual(testContainerInlineStyle.textAlign);
  });

  it('should render Typer component with letter span classes provided',  async () => {
    render(<Typer text={testText} customTypingOptions={testLetterSpanClass} />);
    
    const typer = await screen.findByTestId('typer-cont-id');
    const typerChildren = await screen.findAllByTestId(/^typer-span-id-/);
    
    expect(typer).toBeInTheDocument();
    expect(typerChildren[0].className).toStrictEqual(testLetterSpanClass.typerCharacterClass);
  });

  it('should render Typer component with letter span style provided', async () => {
    render(<Typer text={testText} customTypingOptions={testLetterSpanInlineStyle} />);
    
    const typer = await screen.findByTestId('typer-cont-id');
    const typerChildren = await screen.findAllByTestId(/^typer-span-id-/);
    
    expect(typer).toBeInTheDocument();
    expect(typerChildren[0].style.textAlign).toStrictEqual(testLetterSpanInlineStyle.typerCharacterInlineStyle?.textAlign);
  });

  it('should render Typer component with all default styles cleared v1', async () => {
    render(<Typer text={testText} customTypingOptions={testClearDefaultStylesV1} />);
    
    const typer = await screen.findByTestId('typer-cont-id');
    const typerChildren = await screen.findAllByTestId(/^typer-span-id-/);
    
    expect(typer).toBeInTheDocument();
    expect(typerChildren[0].className).toStrictEqual('');
  });

  it('should render Typer component with all default styles cleared v2', async () => {
    const {rerender} = render(<Typer text={testText} customTypingOptions={testClearDefaultStylesV2} />);
    rerender(<Typer text={testText} customTypingOptions={{clearBuiltinStyle:true}} />);
    
    const typer = await screen.findByTestId('typer-cont-id');
    const typerChildren = await screen.findByTestId(/^typer-span-id-0T1/);
    
    expect(typer).toBeInTheDocument();
    expect(typerChildren.className).toStrictEqual('');
  });
});