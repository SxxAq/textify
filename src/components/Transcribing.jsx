import React from "react";

const Transcribing = ({ downloading }) => {
  return (
    <div className="flex flex-1 items-center flex-col justify-center gap-8 md:gap-14 mb-20 py-24">
      <div className="flex flex-col gap-4 md:gap-6">
        <h1 className="font-extrabold tracking-wide text-4xl md:text-6xl text-gray-800">
          <span className="text-blue-500">Transcribing </span>
        </h1>
        <p className="text-center">
          {!downloading ? "warming up cylinders" : "core cylinders engaged"}
        </p>
      </div>
      <div className="flex justify-center items-center my-2">
        <div className="circle animation-delay-0"></div>
        <div className="circle animation-delay-200"></div>
        <div className="circle animation-delay-400"></div>
        <div className="circle animation-delay-600"></div>
        <div className="circle animation-delay-800"></div>
      </div>
    </div>
  );
};

export default Transcribing;
