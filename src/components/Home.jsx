const Home = () => {
  return (
    <main className="pb-24 flex-1 text-center p-4 gap-3 sm:gap-4 md:gap-5 flex flex-col justify-center">
      <h1 className="font-bold tracking-wide text-5xl md:text-7xl">
        <span className="text-blue-400 font-bold">Text</span>ify
      </h1>
      <h3 className="font-medium md:text-lg">
        Record
        <span className="mx-2 text-blue-400"><i className="fa-solid fa-arrow-right"></i></span>
        Transcribe
        <span className="mx-2 text-blue-400"><i className="fa-solid fa-arrow-right"></i></span>
        Translate
      </h3>
    </main>
  );
};

export default Home;
