import React, { useState } from "react";

const Transcription = ({ output }) => {
  const [copied, setCopied] = useState(false);
  const text = output.map((val) => val.text).join(" ");

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
          <button
            onClick={handleDownload}
            className="px-1 border-2 text-slate-900 border-yellow-300 rounded-md hover:bg-yellow-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 shadow-sm"
            title="Download transcription"
          >
            <i className="fas fa-download text-lg"></i>
          </button>
          <button
            onClick={handleCopy}
            className="px-1 text-slate-900 border-2 border-teal-400 rounded-md hover:bg-teal-400 hover:text-white transition-colors duration-200 flex items-center space-x-2 shadow-sm"
            title="Copy to clipboard"
          >
            <i className={`fas ${copied ? "fa-check" : "fa-copy"} text-lg`}></i>
          </button>
        </div>
      </div>

      <div className="p-1 bg-white text-md  rounded-lg shadow-lg">
        <div className="mt-2 p-2 bg-teal-200 rounded-md shadow-inner">
          <p className="text-gray-900 leading-normal text-md md:text-lg font-medium font-sans whitespace-pre-wrap">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Transcription;
