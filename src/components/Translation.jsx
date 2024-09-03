import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "../utils/presets";

const Translation = ({ output }) => {
  const [copied, setCopied] = useState(false);
  const [translation, setTranslation] = useState(null);
  const [translating, setTranslating] = useState(false);
  const [toLanguage, setToLanguage] = useState("");
  const [error, setError] = useState(null);
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../utils/translate.worker.js", import.meta.url),
      { type: "module" }
    );
    console.log("Worker initialized");

    workerRef.current.onmessage = (e) => {
      console.log("Message received from worker:", e.data);
      switch (e.data.status) {
        case "initiate":
          console.log("DOWNLOADING");
          break;
        case "progress":
          // console.log("LOADING", e.data.progress);
          break;
        case "update":
          setTranslation(e.data.output);
          // console.log("RESULT RECEIVED", e.data.output);
          break;
        case "complete":
          console.log("DONE");
          setTranslating(false);
          break;
        case "error":
          console.error("Error from worker:", e.data.error);
          setError(e.data.error);
          setTranslating(false);
          break;
        default:
          console.log("Unknown message type", e.data.status);
          break;
      }
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        console.log("Worker terminated");
      }
    };
  }, [toLanguage]); // Empty dependency array ensures this effect runs only once

  const text = output.map((val) => val.text).join(" ");

  const generateTranslation = () => {
    if (translating || !toLanguage) return;
    setTranslating(true);
    setError(null);
    workerRef.current.postMessage({
      text,
      src_lang: "eng_Latn",
      tgt_lang: toLanguage,
    });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([translation || text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Textify_${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(translation || text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mx-4 md:mx-[30%] my-6">
      <div className="p-2 bg-white text-md rounded-lg shadow-lg">
        <div className="flex justify-center w-full">
          <div className="flex items-center bg-white rounded-t-lg px-2 w-fit space-x-3">
            <div className="relative">
              <select
                className="appearance-none bg-slate-100 text-slate-800 border border-gray-300 rounded-md p-1.5 w-24 md:w-32 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 ease-in-out"
                value={toLanguage}
                onChange={(e) => {
                  setToLanguage(e.target.value);
                  setTranslation(null);
                  setError(null);
                }}
              >
                <option value="" disabled>
                  Select language
                </option>
                {Object.entries(LANGUAGES).map(([key, value]) => (
                  <option value={value} key={key}>
                    {key}
                  </option>
                ))}
              </select>
              
            </div>
            <button
              onClick={generateTranslation}
              disabled={translating || !toLanguage}
              className={`px-1 py-0.5 border text-slate-900 border-blue-300 rounded-md hover:bg-blue-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 shadow-sm ${
                translating || !toLanguage
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              title="Translate"
            >
              <i className="fas fa-language text-lg"></i>
            </button>
            <button
              onClick={handleDownload}
              className=" px-1.5 py-0.5 border text-slate-900 border-yellow-300 rounded-md hover:bg-yellow-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 shadow-sm"
              title="Download transcription"
            >
              <i className="fas fa-download text-lg"></i>
            </button>
            <button
              onClick={handleCopy}
              className="px-1.5 py-0.5 text-slate-900 border border-teal-400 rounded-md hover:bg-teal-400 hover:text-white transition-colors duration-200 flex items-center space-x-2 shadow-sm"
              title="Copy to clipboard"
            >
              <i
                className={`fas ${copied ? "fa-check" : "fa-copy"} text-lg`}
              ></i>
            </button>
          </div>
        </div>
        <div className="mt-2 p-2 md:p-4 bg-teal-200 rounded-md shadow-inner min-w-[200px] max-w-full">
          {error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : (
            <p className="text-gray-900 leading-normal text-md md:text-lg font-medium font-sans whitespace-pre-wrap">
              {translation || text}
            </p>
          )}
          {translating && (
            <div className="grid place-items-center mt-4">
              <i className="fa-solid fa-spinner animate-spin text-2xl"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Translation;
