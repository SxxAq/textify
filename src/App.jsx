import Header from "./components/Header";
import Home from "./components/Home";
const App = () => {
  return (
    <div className="flex flex-col mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        <Home />
      </section>
    </div>
  );
};

export default App;
