import { useNavigate } from "react-router";
import { motion } from "framer-motion";

import { FaArrowLeft } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const MenuItem = ({ icon, name, callback }) => {
  return (
    <li className="flex items-end">
      <button
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

const Menu = ({ handleShowMenu }) => {
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Back",
      icon: (
        <FaArrowLeft className="w-6 h-6 text-slate-900 dark:text-slate-200 fill-current" />
      ),
      callback: handleShowMenu,
    },
    {
      name: "Home",
      icon: (
        <FaHouse className="w-6 h-6 text-slate-900 dark:text-slate-200 fill-current" />
      ),
      callback: () => {
        navigate("/");
        handleShowMenu();
      },
    },
    {
      name: "Who We Are",
      icon: (
        <FaInfoCircle className="w-6 h-6 text-slate-900 dark:text-slate-200 fill-current" />
      ),
    },
    {
      name: "Art",
      icon: (
        <FaPalette className="w-6 h-6 text-slate-900 dark:text-slate-200 fill-current" />
      ),
      callback: () => {
        navigate("/art");
        handleShowMenu();
      },
    },
    {
      name: "Cart",
      icon: (
        <FaShoppingCart className="w-6 h-6 text-slate-900 dark:text-slate-200 fill-current" />
      ),
      callback: () => {
        navigate("/cart");
        handleShowMenu();
      },
    },
  ];

  return (
    <motion.div
      className="z-10 fixed inset-0 p-8 flex flex-col gap-6 bg-slate-100 dark:bg-slate-900"
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
          <MenuItem
            key={index}
            icon={item.icon}
            name={item.name}
            callback={item.callback}
          />
        ))}
      </ul>
    </motion.div>
  );
};

export default Menu;
