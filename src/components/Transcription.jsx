import React, { useState } from "react";

const Transcription = ({ output }) => {
  const [copied, setCopied] = useState(false);
  const text = output.map((val) => val.text).join(" ");

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcription.txt";
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
      <div className="p-2 bg-white text-md border rounded-lg border-blue-200 shadow-lg">
        <div className="flex justify-between space-x-3 mb-2">
          <button
            onClick={handleDownload}
            className="px-2 py-1 border-2 text-slate-900 border-yellow-300 rounded-md hover:bg-yellow-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 shadow-sm"
            title="Download transcription"
          >
            <i className="fas fa-download text-lg"></i>
          </button>
          <button
            onClick={handleCopy}
            className="px-2 py-1 text-slate-900 border-2  border-blue-400 rounded-md hover:bg-blue-400 hover:text-white transition-colors duration-200 flex items-center space-x-2 shadow-sm"
            title="Copy to clipboard"
          >
            <i className={`fas ${copied ? "fa-check" : "fa-copy"} text-lg`}></i>
          </button>
        </div>
        <div className="mt-2 p-2 bg-gray-50 rounded-md shadow-inner">
          <p className="text-gray-800 leading-relaxed text-lg font-serif whitespace-pre-wrap">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Transcription;
