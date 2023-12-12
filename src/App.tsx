import { CSSProperties, MouseEvent, useEffect, useState } from "react";
import "./styles.css";
import Typer from "./components/TyperContainer";

const testText = `Whether in singles against him or doubles alongside, when Hal is on-court with 
Wayne he always gets the creepy feeling that Wayne has control out there not just of 
his voluntary CNS but also of his heartrate and blood pressure, the diameter of his 
pupils, etc., which feeling is not only creepy but distracting, adding to the tension of 
playing with Wayne.`;

export default function App() {
  const [ip, setIp] = useState(testText);
  const [ipIsLoading, setIpIsLoading] = useState(false);
  const [mode, setMode] = useState<CustomTypingOptions>({});
  const modeList: string[] = ['negativeTypewriter', 'blackGreenTerminal', 'typewriter'];
  const [cl, setCl] = useState<string | string[]>('');
  const [style, setStyle] = useState<CSSProperties>({});

  const clickedLoading = () => {
    setIpIsLoading(!ipIsLoading);
  };

  const clickedText = () => {
    const t = 'I just changed the text to be typed to this! The End.';
    if (ip === t) {
      setIp(testText);
    } else {
      setIp('I just changed the text to be typed to this! The End.');
    }
  };

  const clickedMode = () => {
    const o: CustomTypingOptions = {}

    if (mode.mode) {
      const i = modeList.indexOf(mode.mode);
      const next = ((i + 1) < modeList.length) ? modeList[i+1] : modeList[0];
      o.mode = next;
      setMode(o);
    } else {
      o.mode = modeList[0];
      setMode(o);
    }
  };

  const clickedClass = () => {
    if (cl === 'TestClass') {
      setCl('');
    } else {
      setCl('TestClass');
    }
  };

  const clickedStyle = () => {
    if (style?.padding === '3%') {
      setStyle({});
    } else {
      setStyle({
        display: 'flex-grow',
        padding: '5%'
      });
    }
  };

  return (
    <div className="App">
      <div className="flex">
        <button onClick={clickedLoading}>toggle loading</button>
        <button onClick={clickedText}>toggle texts</button>
        <button onClick={clickedMode}>toggle modes</button>
        <button onClick={clickedClass}>toggle classes</button>
        <button onClick={clickedStyle}>toggle styles</button>
      </div>

      <br/>
      <br/>

      <div className="flex">
        <Typer
          text={ip}
          isVisible={!ipIsLoading}
          customTypingOptions={mode}
          typerContainerClass={cl}
          typerContainerInlineStyle={style}/>
      </div>
    </div>
  );
}
