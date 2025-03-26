import { useNavigate, useLocation } from "react-router";

import { IoMdMenu } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

import ToggleDarkMode from "./ToggleDarkMode";

const Title = () => {
  const navigate = useNavigate();
  return (
    <button className="w-full cursor-pointer" onClick={() => navigate("/")}>
      <h1
        data-testid="page-header"
        className=" text-rose-700 text-center md:text-left font-roboto-condensed text-xl md:text-2xl xl:text-3xl font-bold"
      >
        Artful Finds
      </h1>
    </button>
  );
};

const MobileHeaderNav = ({ handleShowMenu }) => {
  return (
    <nav
      className="md:hidden w-full bg-white dark:bg-slate-950"
      data-testid="mobile-nav"
    >
      <ul className="w-full flex justify-between items-center">
        <li className="flex justify-center items-center">
          <button
            data-testid="show-mobile-menu-button"
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

const HeaderNav = ({ shoppingCart, numberOfItemsInCart }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: "home",
      text: "Home",
      callback: () => navigate("/"),
      testId: "nav-item-home",
    },
    {
      name: "about",
      text: "Who We Are",
      callback: () => {},
      testId: "nav-item-about",
    },
    {
      name: "shop",
      text: "Shop",
      callback: () => navigate("/art"),
      testId: "nav-item-shop",
    },
    {
      name: "cart",
      text: (
        <FaShoppingCart className="w-6 h-6 dark:text-slate-100 fill-current" />
      ),
      callback: () => navigate("/cart"),
      testId: "nav-item-cart",
    },
    {
      name: "mode",
      text: <ToggleDarkMode />,
      callback: () => {},
      testId: "nav-item-mode",
    },
  ];

  return (
    <nav className="hidden md:flex w-full" data-testid="desktop-nav">
      <Title />
      <ul
        id={location.pathname == "/" ? "nav-items" : ""}
        className="w-full max-w-[500px] flex justify-between items-center"
      >
        {navItems.map((item) => {
          if (item.name === "cart") {
            return (
              <li
                key={item.name}
                className="relative flex justify-center items-center"
                data-testid={item.testId}
              >
                <button
                  className="flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out hover:animate-rotate-45-degrees"
                  onClick={item.callback}
                  data-testid={`${item.testId}-button`}
                >
                  {item.text}
                </button>
                {shoppingCart.length > 0 && (
                  <div
                    key={numberOfItemsInCart}
                    className={`pointer-events-none absolute -bottom-2 -right-2 w-5 h-5 flex justify-center items-center bg-green-700 text-white text-sm font-bold rounded-full ${
                      numberOfItemsInCart === 1
                        ? "animate-scale-in"
                        : "animate-zoom-in-and-out"
                    }`}
                    data-testid="cart-count"
                  >
                    {numberOfItemsInCart}
                  </div>
                )}
              </li>
            );
          } else if (item.name === "mode") {
            return (
              <li
                key={item.name}
                className="flex justify-center items-center cursor-pointer"
                data-testid={item.testId}
              >
                {item.text}
              </li>
            );
          } else {
            return (
              <li
                key={item.name}
                className="flex justify-center items-center font-medium"
                data-testid={item.testId}
              >
                <button
                  className="cursor-pointer text-base dark:text-slate-100 font-medium hover:underline"
                  onClick={item.callback}
                  data-testid={`${item.testId}-button`}
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

const Header = ({ handleShowMenu, shoppingCart, numberOfItemsInCart }) => {
  return (
    <header className="z-10 px-4 md:px-8 py-4 fixed w-full flex justify-center items-center bg-white dark:bg-slate-950 md:dark:bg-slate-950/0 md:bg-white/0 md:backdrop-blur-xs">
      <MobileHeaderNav handleShowMenu={handleShowMenu} />
      <HeaderNav
        shoppingCart={shoppingCart}
        numberOfItemsInCart={numberOfItemsInCart}
      />
    </header>
  );
};

export default Header;
