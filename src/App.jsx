import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import FileDisplay from "./components/FileDisplay";
import Info from "./components/Info";
import Transcribe from "./components/Transcribe";
const App = () => {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(true);
  const [loading, setLoading] = useState(true);
  const isAudioAvailable = file || audioStream;

  function handleAudioReset() {
    setAudioStream(null);
    setFile(null);
  }
  return (
    <div className="flex flex-col mx-auto w-full ">
      <Header />
      <section className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white">
        {output ? (
          <Info />
        ) : loading ? (
          <Transcribe />
        ) : isAudioAvailable ? (
          <FileDisplay
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
