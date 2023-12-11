import { useEffect, useState } from "react";
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

  return (
    <div className="App">
      <Typer text={ip} isLoading={ipIsLoading} />
    </div>
  );
}
