import { useNavigate } from "react-router";
import { motion } from "framer-motion";

import { FaArrowLeft } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const MenuItem = ({ item }) => {
  const { dataTestId, icon, name, callback } = item;
  return (
    <li className="flex items-end">
      <button
        data-testid={dataTestId}
        className="flex justify-center items-center gap-4 group cursor-pointer"
        onClick={callback}
      >
        {icon}
        <p className="text-xl text-slate-900 dark:text-slate-200 font-bold group-hover:underline group-active:underline transition-all duration-300 ease-in-out">
          {name}
        </p>
      </button>
    </li>
  );
};

const MobileMenu = ({ handleShowMobileMenu }) => {
  const navigate = useNavigate();
  const menuItems = [
    {
      dataTestId: "back-button",
      name: "Back",
      icon: (
        <FaArrowLeft className="w-6 h-6 text-slate-900 dark:text-slate-200 fill-current" />
      ),
      callback: handleShowMobileMenu,
    },
    {
      dataTestId: "home-button",
      name: "Home",
      icon: (
        <FaHouse className="w-6 h-6 text-slate-900 dark:text-slate-200 fill-current" />
      ),
      callback: () => {
        navigate("/");
        handleShowMobileMenu();
      },
    },
    {
      dataTestId: "about-button",
      name: "Who We Are",
      icon: (
        <FaInfoCircle className="w-6 h-6 text-slate-900 dark:text-slate-200 fill-current" />
      ),
    },
    {
      dataTestId: "shop-button",
      name: "Art",
      icon: (
        <FaPalette className="w-6 h-6 text-slate-900 dark:text-slate-200 fill-current" />
      ),
      callback: () => {
        navigate("/art");
        handleShowMobileMenu();
      },
    },
    {
      dataTestId: "cart-button",
      name: "Cart",
      icon: (
        <FaShoppingCart className="w-6 h-6 text-slate-900 dark:text-slate-200 fill-current" />
      ),
      callback: () => {
        navigate("/cart");
        handleShowMobileMenu();
      },
    },
  ];

  return (
    <motion.div
      data-testid="mobile-menu"
      className="z-10 fixed inset-0 p-8 flex flex-col gap-6 bg-gradient-to-b from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800"
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
    >
      <h1 className="text-2xl text-slate-900 dark:text-slate-200 font-roboto-condensed font-bold">
        Menu
      </h1>
      <ul className="p-4 flex flex-col gap-6">
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </ul>
    </motion.div>
  );
};

export default MobileMenu;
