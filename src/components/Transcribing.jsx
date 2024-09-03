import React, { useState, useEffect } from "react";

const Transcribing = ({ downloading, progress }) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (progress !== undefined) {
      setCurrentProgress(progress);
    }
  }, [progress]);

  return (
    <div className="flex flex-1 items-center flex-col justify-center gap-8 md:gap-14 mb-20 py-24">
      <div className="flex flex-col gap-4 md:gap-6">
        <h1 className="font-extrabold tracking-wide text-4xl md:text-6xl text-gray-800">
          <span className="text-teal-500">Transcribing </span>
        </h1>
        <p className="text-center font-bold text-teal-700">
          {!downloading ? "Initializing systems" : "Full power activated"}
        </p>
      </div>
      {/* Progress Bar Implementation */}
      {downloading && (
        <div className="px-4 pt-4 max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                In Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-teal-600">
                {Math.round(currentProgress)}%
              </span>
            </div>
          </div>
          <div className="flex w-[200px] md:w-[400px]  rounded-full h-2 md:h-4 lg:h-6 bg-gray-200">
            <div
              style={{ width: `${currentProgress}%` }}
              className="rounded-full bg-teal-500"
            ></div>
          </div>
        </div>
      )}
      {progress === 100 && (
        <div className="text-center ">
          <p className="text-teal-600 text-md font-medium animate-pulse">
            Summarizing, please wait...
          </p>
        </div>
      )}
    </div>
  );
};

export default Transcribing;
