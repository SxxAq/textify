import { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import FileDisplay from "./components/FileDisplay";
import Info from "./components/Info";
import Transcribing from "./components/Transcribing";
import { MessageTypes } from "./utils/presets";
const App = () => {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const isAudioAvailable = file || audioStream;

  function handleAudioReset() {
    setAudioStream(null);
    setFile(null);
  }

  const worker = useRef(null);
  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("./utils/whisper.worker.js", import.meta.url),
        { type: "module" }
      );
      console.log("Worker initialized");
    }

    const onMessageReceived = (e) => {
      // console.log("Message received from worker:", e.data);
      switch (e.data.type) {
        case MessageTypes.DOWNLOADING:
          setDownloading(true);
          setProgress(e.data.progress);
          console.log("DOWNLOADING");
          break;
        case MessageTypes.LOADING:
          setLoading(true);
          console.log("LOADING");
          break;
        case MessageTypes.RESULT:
          setOutput(e.data.results);
          console.log("RESULT RECEIVED", e.data.results);
          break;
        case MessageTypes.INFERENCE_DONE:
          setFinished(true);
          setDownloading(false);
          console.log("INFERENCE DONE");
          break;
        default:
          console.log("Unknown message type", e.data.type);
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () => {
      worker.current.removeEventListener("message", onMessageReceived);
      console.log("Worker event listener removed");
    };
  }, []);

  const readAudio = async (file) => {
    const sampling_rate = 16000;
    const audioCTX = new AudioContext({ sampleRate: sampling_rate });
    const response = await file.arrayBuffer();
    const decoded = await audioCTX.decodeAudioData(response);
    const audio = decoded.getChannelData(0);
    return audio;
  };
  const handleFormSubmission = async () => {
    if (!file && !audioStream) return;
    let audio = await readAudio(file ? file : audioStream);
    const model = "Xenova/whisper-small";
    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model,
    });
  };
  return (
    <div className="flex flex-col mx-auto w-full ">
      <Header />
      <section className="min-h-screen flex flex-col bg-gradient-to-b from-teal-200 to-white">
        {output ? (
          <Info output={output} />
        ) : loading ? (
          <Transcribing downloading={downloading} progress={progress} />
        ) : isAudioAvailable ? (
          <FileDisplay
            handleFormSubmission={handleFormSubmission}
            handleAudioReset={handleAudioReset}
            file={file}
            audioStream={audioStream}
          />
        ) : (
          <Home setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
    </div>
  );
};

export default App;
