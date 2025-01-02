import { useState } from "react";

import { IoMdSunny } from "react-icons/io";
import { HiMoon } from "react-icons/hi2";

const ToggleDarkModeIcon = () => {
  const [darkMode, setDarkMode] = useState(false);
  console.log("Dark mode:", darkMode);

  const toggleDarkMode = () => {
    console.log("Toggling dark mode");
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <li className="flex min-w-[80px]">
      <button
        key="toggle-dark-mode"
        onClick={toggleDarkMode}
        className="p-1 rounded-full border-2 border-white hover:border-green-600 active:scale-95 transition
        dark:border-slate-900"
      >
        {darkMode ? (
          <HiMoon className="w-8 h-8 fill-current" />
        ) : (
          <IoMdSunny className="w-8 h-8 fill-current" />
        )}
      </button>
    </li>
  );
};

export default ToggleDarkModeIcon;
