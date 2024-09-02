
const FileDisplay = ({
  file,
  handleFormSubmission,
  handleAudioReset,
  audioStream,
}) => {
  // Create a URL for the audio source if a file is provided
  const audioSrc = file
    ? URL.createObjectURL(file)
    : URL.createObjectURL(audioStream);

  return (
    <main className="pb-24 flex-1 text-center p-4 gap-5 sm:gap-6 md:gap-7 flex flex-col justify-center w-fit max-w-full mx-auto">
      <h1 className="font-extrabold tracking-wide text-4xl md:text-6xl text-gray-800">
        <span className="text-teal-500">Your </span>File
      </h1>
      <div className="flex flex-col">
        <div className="flex items-center mx-auto gap-2 mb-4">
          <h3 className="font-semibold">Name: </h3>
          <p>{file ? file.name : "Custom Audio"}</p>
        </div>

        <div className="bg-[#f5f5f5] border border-teal-400 rounded-lg ">
          <audio className="" controls src={audioSrc}>
            Your browser does not support the audio element.
          </audio>
        </div>
        {/* <CustomAudio src={audioSrc} /> */}
      </div>
      <div className="flex justify-between items-center gap-8 mt-6">
        <button
          onClick={handleAudioReset}
          className="flex items-center gap-2 Btn text-teal-500 border border-teal-500 font-semibold py-2 px-6 hover:text-white hover:bg-teal-500 rounded-lg transition-colors duration-200"
        >
          <p>Reset</p>
          <i className="fa-solid fa-rotate-left"></i>
        </button>
        <button
          onClick={handleFormSubmission}
          className="flex items-center gap-2 Btn text-teal-500 border border-teal-500 hover:text-white hover:bg-teal-500 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <p>Transcribe</p>
          <i className="fa-solid fa-keyboard"></i>
        </button>
      </div>
    </main>
  );
};

export default FileDisplay;
