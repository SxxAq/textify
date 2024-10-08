const Header = () => {
  return (
    <div className="bg-slate-100 ">
      <header className="flex items-center justify-between px-4 py-2 md:px-8 mx-4 md:mx-20">
        <a href="/">
          <h1 className="text-xl md:text-2xl font-medium">
            <span className="text-teal-600 font-bold">Text</span>ify
          </h1>
        </a>
        <a
          href="/"
          className="flex items-center border  border-teal-500 Btn gap-1.5 px-2 py-1 md:px-3 md:py-1 rounded-md"
        >
          <p className="md:text-lg text-md font-medium tracking-wide text-gray-700">
            New
          </p>
          <i className="fa-solid fa-plus text-teal-500 text-lg md:text-xl ml-1"></i>
        </a>
      </header>
    </div>
  );
};

export default Header;
