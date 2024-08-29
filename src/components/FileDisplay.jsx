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
        <p>{file.name}</p>
      </div>
      <div className="flex justify-between items-center gap-8 ">
        <button
          onClick={handleAudioReset}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Reset
        </button>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg">
          Transcribe
        </button>
      </div>
    </main>
  );
};

export default FileDisplay;
