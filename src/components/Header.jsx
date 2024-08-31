const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 md:px-8 mx-4 md:mx-20">
      <a href="/">
        <h1 className="text-xl md:text-2xl font-medium">
          <span className="text-blue-500 font-bold">Text</span>ify
        </h1>
      </a>
      <a href="/" className="flex items-center Btn gap-2 px-4 py-2 rounded-lg">
        <p className="text-lg font-medium tracking-wide text-gray-600">New</p>
        <i className="fa-solid fa-plus text-blue-500 text-lg md:text-xl ml-1"></i>
      </a>
    </header>
  );
};

export default Header;
