import { useState, useEffect } from "react";

import { IoSunnyOutline } from "react-icons/io5";
import { HiMoon } from "react-icons/hi2";

const ToggleDarkMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log("Change theme to:", newTheme);
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      key="toggle-dark-mode"
      onClick={changeTheme}
      className="flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out"
    >
      {theme === "dark" ? (
        <HiMoon
          key="dark"
          className="w-6 h-6 dark:text-slate-100 fill-current animate-scale-in"
        />
      ) : (
        <IoSunnyOutline
          key="light"
          className="w-6 h-6 dark:text-slate-100 fill-current animate-scale-in"
        />
      )}
    </button>
  );
};

export default ToggleDarkMode;
