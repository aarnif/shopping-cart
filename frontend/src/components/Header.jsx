import { useNavigate, useLocation } from "react-router";

import { IoMdMenu } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

import ToggleDarkMode from "./ToggleDarkMode";

const Title = () => {
  const navigate = useNavigate();
  return (
    <h1 className="w-full text-rose-700 text-center md:text-left font-roboto-condensed text-xl md:text-2xl xl:text-3xl font-bold">
      <button className="cursor-pointer" onClick={() => navigate("/")}>
        Artful Finds
      </button>
    </h1>
  );
};

const MobileHeaderNav = ({ handleShowMenu }) => {
  return (
    <nav className="md:hidden w-full bg-white dark:bg-slate-950">
      <ul className="w-full flex justify-between items-center">
        <li className="flex justify-center items-center">
          <button
            className="flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out"
            onClick={handleShowMenu}
          >
            <IoMdMenu className="w-6 h-6 fill-current text-slate-900 dark:text-slate-50" />
          </button>
        </li>
        <li className="flex justify-center items-center">
          <Title />
        </li>
        <li className="flex justify-center items-center">
          <ToggleDarkMode />
        </li>
      </ul>
    </nav>
  );
};

const HeaderNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "home", text: "Home", callback: () => navigate("/") },
    { name: "about", text: "Who We Are", callback: () => {} },
    { name: "shop", text: "Shop", callback: () => navigate("/art") },
    {
      name: "cart",
      text: (
        <FaShoppingCart className="w-6 h-6 dark:text-slate-100 fill-current" />
      ),
      callback: () => navigate("/cart"),
    },
    {
      name: "mode",
      text: <ToggleDarkMode />,
      callback: () => {},
    },
  ];

  return (
    <nav className="hidden md:flex w-full">
      <Title />
      <ul
        id={location.pathname == "/" ? "nav-items" : ""}
        className="w-full max-w-[500px] flex justify-between items-center"
      >
        {navItems.map((item) => {
          if (item.name === "cart") {
            return (
              <li key={item.name} className="flex justify-center items-center">
                <button
                  className="flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out hover:animate-rotate-45-degrees"
                  onClick={item.callback}
                >
                  {item.text}
                </button>
              </li>
            );
          } else if (item.name === "mode") {
            return (
              <li
                key={item.name}
                className="flex justify-center items-center cursor-pointer"
              >
                {item.text}
              </li>
            );
          } else {
            return (
              <li
                key={item.name}
                className="flex justify-center items-center font-medium"
              >
                <button
                  className="cursor-pointer text-base dark:text-slate-100 font-medium hover:underline"
                  onClick={item.callback}
                >
                  {item.text}
                </button>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

const Header = ({ handleShowMenu }) => {
  return (
    <header className="z-10 px-4 md:px-8 py-4 fixed w-full flex justify-center items-center bg-white dark:bg-slate-950 md:dark:bg-slate-950/0 md:bg-white/0 md:backdrop-blur-xs">
      <MobileHeaderNav handleShowMenu={handleShowMenu} />
      <HeaderNav />
    </header>
  );
};

export default Header;
