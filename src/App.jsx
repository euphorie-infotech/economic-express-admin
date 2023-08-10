import NewsCategory from "./pages/NewsCategory/NewsCategory";
import adminBg from "../src/assets/images/admin1.jpg";

function App() {
  return (
    <section className="w-screen min-h-screen flex justify-between items-center">
      <div className="basis-1/5">
        <img
          src={adminBg}
          alt="news category background"
          className="h-screen"
        />
      </div>
      <div className="basis-4/5 relative">
        <div className=" h-screen overflow-scroll ">
          <NewsCategory />
        </div>
        <div className="w-full absolute bottom-0 bg-black text-white text-center py-1">
          <p className="text-xs font-extralight">
            Designed and Developed by -{" "}
            <span className="text-cyan-700 text-sm font-light font-mono">
              Euphorie Infotech
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default App;
