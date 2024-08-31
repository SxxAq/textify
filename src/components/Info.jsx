import { useState } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

const Info = () => {
  const [tab, setTab] = useState("transcription");

  function toggleTab() {
    if (tab === "transcription") {
      setTab("translation");
    } else {
      setTab("transcription");
    }
  }
  return (
    <main
      className="pb-24 flex-1 text-center gap-5 sm:gap-6 md:gap-7 flex
   flex-col justify-center  w-full max-w-prose mx-auto"
    >
      <h1 className="font-extrabold whitespace-nowrap text-2xl md:text-4xl text-gray-800">
        <span className="text-blue-500">Your </span>Transcription
      </h1>

      <div
        className="grid grid-cols-2 mx-auto bg-white
       shadow rounded-lg overflow-hidden items-center gap-2"
      >
        <button
          onClick={toggleTab}
          className={`px-4 py-2 font-medium ${
            tab === "transcription"
              ? "bg-blue-500 text-white duration-200"
              : "text-gray-500"
          }`}
        >
          Transcription
        </button>
        <button
          onClick={toggleTab}
          className={`px-4 py-2 font-medium ${
            tab === "translation"
              ? "bg-blue-500 text-white duration-200"
              : "text-gray-500"
          }`}
        >
          Translation
        </button>
      </div>
      {tab === "transcription" ? <Transcription /> : <Translation />}
    </main>
  );
};

export default Info;
