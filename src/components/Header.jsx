import { IoMdMenu } from "react-icons/io";

import ToggleDarkMode from "./ToggleDarkMode";

const Header = ({ handleShowMenu }) => {
  return (
    <header className="z-10 p-4 fixed w-full flex justify-center items-center bg-white shadow-xl">
      <nav className="w-full">
        <ul className="w-full flex justify-between items-center">
          <li className="flex justify-center items-center hover:underline cursor-pointer">
            <button
              className="flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out"
              onClick={handleShowMenu}
            >
              <IoMdMenu className="w-7 h-7 fill-current" />
            </button>
          </li>
          <li className="flex justify-center items-center hover:underline cursor-pointer">
            <h1 className="text-rose-700 text-center font-roboto-condensed text-2xl font-bold">
              Artful Finds
            </h1>
          </li>
          <li className="flex justify-center items-center cursor-pointer">
            <ToggleDarkMode />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
