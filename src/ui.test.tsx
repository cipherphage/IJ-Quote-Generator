import { render, screen } from '@testing-library/react';

import Typer from './index';
import { defaultStyleClasses } from './utils/defaults';

const testText = "This gets typed, let's make it long so some of it gets rendered during the test.";
const testCustomTypingOptions: CustomTypingOptions = {
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
});