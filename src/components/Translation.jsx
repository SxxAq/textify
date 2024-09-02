import { useState } from "react";
import { LANGUAGES } from "../utils/presets";

const Translation = ({ output }) => {
  const [copied, setCopied] = useState(false);
  const [translation, setTranslation] = useState(null);
  const [translating, setTranslating] = useState(null);
  const [toLanguage, setToLanguage] = useState("Select language");
  const text = output.map((val) => val.text).join(" ");

  function generateTranslation() {
    if (translating || toLanguage === "Select language") return;
    setTranslating(true)
    Worker.current.postMessage({
      text,
      src_language: "eng_Latn",
      tgt_lang: toLanguage,
    });
  }

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Textify_${new Date().getTime()}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mx-4 my-6">
      <div className="flex justify-end w-full">
        <div className="flex justify-end bg-white rounded-t-lg px-2 pt-2 w-fit space-x-3">
          <div className="">
            <select
              className="appearance-none bg-slate-100 text-slate-800 border border-gray-300 rounded-md px-3 py-2 w-32 md:w-44 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 ease-in-out"
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
            >
              <option value="" disabled>
                Select language
              </option>
              {Object.entries(LANGUAGES).map(([key, value]) => (
                <option onClick={generateTranslation} value={value} key={key}>
                  {key}
                </option>
              ))}
            </select>
            <i className="fa-solid fa-globe"></i>
          </div>
          <button
            onClick={handleDownload}
            className="px-3 py-2 border-2 text-slate-900 border-yellow-300 rounded-md hover:bg-yellow-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 shadow-sm"
            title="Download transcription"
          >
            <i className="fas fa-download text-lg"></i>
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-2 text-slate-900 border-2 border-teal-400 rounded-md hover:bg-teal-400 hover:text-white transition-colors duration-200 flex items-center space-x-2 shadow-sm"
            title="Copy to clipboard"
          >
            <i className={`fas ${copied ? "fa-check" : "fa-copy"} text-lg`}></i>
          </button>
        </div>
      </div>

      <div className="p-4 bg-white text-md rounded-lg shadow-lg">
        <div className="mt-2 p-4 bg-teal-200 rounded-md shadow-inner">
          <p className="text-gray-900 leading-normal text-md md:text-lg font-medium font-sans whitespace-pre-wrap">
            {translation && !translating ? translation : text}
            {translating && (
              <div className="grid place-items-center">
                <i className="fa-solid fa-spinner animate-spin"></i>
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Translation;
