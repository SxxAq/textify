const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 md:px-8 mx-4 md:mx-20">
      <h1 className="text-xl md:text-2xl font-medium">
        <span className="text-blue-400 font-bold">Text</span>ify
      </h1>
      <button className="flex items-center Btn gap-2 px-4 py-2 rounded-md">
        <p className="text-lg font-medium tracking-wide">New</p>
        <i className="fa-solid fa-plus text-blue-400 text-lg md:text-xl ml-1"></i>
      </button>
    </header>
  );
};

export default Header;
