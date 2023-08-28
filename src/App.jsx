import adminBg from "../src/assets/images/admin1.jpg";
import { routes } from "./routes/paths";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useStateValue } from "./states/StateProvider";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const [{ isLoggedIn, authToken }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch({ type: "setIsLoggedIn", item: false });
    dispatch({ type: "setAuthToken", item: "" });
    navigate("/login");
  };

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
          <div
            className={`flex items-center  px-10 py-5 ${
              !isLoggedIn ? "justify-end" : "justify-around"
            }`}
          >
            {!isLoggedIn ? (
              <Link to="/login">
                <h1 className="font-serif border border-black text-2xl py-1 px-2 rounded-lg hover:text-white hover:bg-slate-700 transition-all duration-500 cursor-pointer">
                  Login
                </h1>
              </Link>
            ) : (
              <>
                {routes.map((route) => (
                  <Link to={route.path} key={route.name}>
                    <h1 className="font-serif border border-black text-2xl py-1 px-2 rounded-lg hover:text-white hover:bg-slate-700 transition-all duration-500 cursor-pointer">
                      {route.name}
                    </h1>
                  </Link>
                ))}
                <h1
                  className="font-serif border border-black text-2xl py-1 px-2 rounded-lg hover:text-white hover:bg-slate-700 transition-all duration-500 cursor-pointer"
                  onClick={logOutHandler}
                >
                  Logout
                </h1>
              </>
            )}
          </div>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <ProtectedRoutes>
            <Routes>
              {routes.map((route) => (
                <Route
                  path={route.path}
                  element={route.element}
                  key={route.name}
                />
              ))}
            </Routes>
          </ProtectedRoutes>
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
