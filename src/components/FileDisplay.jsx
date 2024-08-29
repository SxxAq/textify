const FileDisplay = ({ file, handleAudioReset, audioStream }) => {
  return (
    <main
      className="pb-24 flex-1 text-center p-4 gap-5 sm:gap-6 md:gap-7 flex
     flex-col justify-center  w-fit max-w-full mx-auto"
    >
      <h1 className="font-extrabold tracking-wide text-4xl md:text-6xl text-gray-800">
        <span className="text-blue-500">Your </span>File
      </h1>
      <div className="flex items-center mx-auto gap-2">
        <h3 className="font-semibold">Name : </h3>
        <p>{file ? file.name : "Custom Audio"}</p>
      </div>
      <div className="flex justify-between items-center gap-8 ">
        <button
          onClick={handleAudioReset}
          className="flex items-center gap-2 Btn text-red-500 border border-red-500 font-semibold py-2 px-6 hover:text-white hover:bg-red-500 rounded-lg"
        >
          <p>Reset</p>
          <i className="fa-solid fa-rotate-left"></i>
        </button>
        <button className="flex items-center gap-2 Btn text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500 font-semibold py-2 px-4 rounded-lg">
          <p>Transcribe</p>
          <i className="fa-solid fa-keyboard"></i>
        </button>
      </div>
    </main>
  );
};

export default FileDisplay;
