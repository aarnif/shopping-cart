import { useNavigate, useLocation } from "react-router";

import { IoMdMenu } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

import ToggleDarkMode from "./ToggleDarkMode";

const Title = () => (
  <h1 className="w-full text-rose-700 text-center md:text-left font-roboto-condensed text-2xl font-bold">
    Artful Finds
  </h1>
);

const MobileHeaderNav = ({ handleShowMenu }) => {
  return (
    <nav className="md:hidden w-full bg-white">
      <ul className="w-full flex justify-between items-center">
        <li className="flex justify-center items-center">
          <button
            className="flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out"
            onClick={handleShowMenu}
          >
            <IoMdMenu className="w-7 h-7 fill-current" />
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
      text: <FaShoppingCart className="w-7 h-7 fill-current" />,
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
                className="flex justify-center items-center font-medium hover:underline cursor-pointer active:underline"
              >
                <button className="cursor-pointer" onClick={item.callback}>
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
    <header className="z-10 px-4 md:px-8 py-4 fixed w-full flex justify-center items-center bg-white md:bg-white/0 md:backdrop-blur-xs">
      <MobileHeaderNav handleShowMenu={handleShowMenu} />
      <HeaderNav />
    </header>
  );
};

export default Header;
