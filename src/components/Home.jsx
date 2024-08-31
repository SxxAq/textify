import { useState, useEffect, useRef } from "react";
const Home = ({ setFile, setAudioStream }) => {
  const [recStatus, setRecStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);

  const mimeType = "audio/webm";
  const startRecording = async () => {
    let tempStream;
    console.log("Start recording");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      tempStream = stream;
    } catch (error) {
      console.log(error);
      return;
    }
    setRecStatus("recording");
    // create new recording instance using stream
    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") {
        return;
      }
      if (event.data.size === 0) {
        return;
      }
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = async () => {
    setRecStatus("inactive");
    console.log("stop recording");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  };
  useEffect(() => {
    if (recStatus === "inactive") {
      return;
    }
    const interval = setInterval(() => {
      setDuration((curr) => curr + 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <main className="pb-24 flex-1 text-center py-4 px-6 gap-5 sm:gap-6 md:gap-7 flex flex-col justify-center">
      <h1 className="font-extrabold tracking-wide text-5xl md:text-7xl text-gray-800">
        <span className="text-blue-500">Text</span>ify
      </h1>
      <h3 className="font-medium md:text-lg text-gray-700">
        Record
        <span className="mx-2 text-blue-500">
          <i className="fa-solid fa-arrow-right"></i>
        </span>
        Transcribe
        <span className="mx-2 text-blue-500">
          <i className="fa-solid fa-arrow-right"></i>
        </span>
        Translate
      </h3>
      <button
        onClick={recStatus === "recording" ? stopRecording : startRecording}
        className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4
      Btn text-blue-400 font-semibold py-2 px-4 rounded-lg 
       shadow-md hover:text-white hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-700 duration-200"
      >
        <p>{recStatus === "inactive" ? "Record" : "Stop"}</p>
        <div className="flex items-center gap-2">
          {duration > 0 && <p className="text-sm">{duration}s</p>}

          <i className="fa-solid fa-microphone"></i>
        </div>
      </button>
      <p className="text-base text-gray-600">
        Or{" "}
        <label className="text-blue-500 cursor-pointer hover:text-blue-600 duration-200">
          upload
          <input
            onChange={(e) => {
              const tempFile = e.target.files[0];
              setFile(tempFile);
            }}
            className="hidden"
            type="file"
            accept=".mp3,.wave"
          />
        </label>{" "}
        a mp3 file
      </p>
      <p className="mt-6 text-lg italic font-medium text-[16px] text-gray-800 bg-gradient-to-r from-blue-300 to-teal-300 text-transparent bg-clip-text">
        Free Transcribe and Translate, No Strings Attached
      </p>
    </main>
  );
};

export default Home;
