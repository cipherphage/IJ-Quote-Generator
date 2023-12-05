import { useEffect, useState } from "react";
import "./styles.css";
import Typer from "./components/TyperContainer";
import { fetchTheIp, fetchIJQuote, testUrl, ijFilePath } from "./utils/api";

export default function App() {
  const [ip, setIp] = useState('');
  const [ipIsLoading, setIpIsLoading] = useState(true);
  const [ipMessage, setIpMessage] = useState(
    `Loading your IP address from ${testUrl} ...`);

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [qIsLoading, setQIsLoading] = useState(true);
  const [qMessage, setQMessage] = useState(
    `Loading Infinite Jest Quote from ${ijFilePath} ...`);

  // Load flag text on first mount of component.
  useEffect(() => {
      loadIp();
      loadQ();
  }, []);

  const loadIp = async () => {
    // TODO: handle http error and other edge cases.
    const i = await fetchTheIp(testUrl);
    setIp(i);
    setIpMessage('Your IP address is: ');
    setIpIsLoading(false);
  };

  const loadQ = async () => {
    // TODO: handle http error and other edge cases.
    const q = await fetchIJQuote(ijFilePath);
    setQuote(q.q);
    setAuthor(q.a);
    setQMessage('');
    setQIsLoading(false);
  }
  
  return (
    <div className="App">
      <Typer word={ip} isLoading={ipIsLoading} message={ipMessage} subtitle="" />
      <Typer word={quote} isLoading={qIsLoading} message={qMessage} subtitle={author} />
    </div>
  );
}
