const Home = () => {
  return (
    <main className="pb-24 flex-1 text-center p-4 gap-5 sm:gap-6 md:gap-7 flex flex-col justify-center bg-gradient-to-b from-blue-100 to-white">
      <h1 className="font-extrabold tracking-wide text-5xl md:text-7xl text-gray-800">
        <span className="text-blue-500">Text</span>ify
      </h1>
      <h3 className="font-medium md:text-lg text-gray-700">
        Record
        <span className="mx-2 text-blue-500">
          <i className="fa-solid fa-arrow-right"></i>
        </span>
        Transcribe
        <span className="mx-2 text-blue-500">
          <i className="fa-solid fa-arrow-right"></i>
        </span>
        Translate
      </h3>
      <button className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-700 duration-200">
        <p>Record</p>
        <i className="fa-solid fa-microphone"></i>
      </button>
      <p className="text-base text-gray-600">
        Or{" "}
        <label className="text-blue-500 cursor-pointer hover:text-blue-600 duration-200">
          upload
          <input className="hidden" type="file" accept=".mp3,.wave" />
        </label>{" "}
        a mp3 file
      </p>
      <p className="mt-6 text-lg italic font-medium text-gray-800 bg-gradient-to-r from-blue-300 to-blue-400 text-transparent bg-clip-text">
        Free Transcribe and Translate, No Strings Attached
      </p>
    </main>
  );
};

export default Home;
