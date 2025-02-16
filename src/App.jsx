import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Routes, Route } from "react-router";

import { FaShoppingCart } from "react-icons/fa";

import Header from "./components/Header";
import Home from "./components/Home";
import Art from "./components/Art";
import ArtWork from "./components/ArtWork";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

const App = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="w-full min-h-screen flex flex-col animate-fade-in">
      <Header handleShowMenu={handleShowMenu} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/art" element={<Art />} />
        <Route path="/art/:id" element={<ArtWork />} />
      </Routes>
      <Footer />
      <AnimatePresence>
        {showMenu && <Menu handleShowMenu={handleShowMenu} />}
      </AnimatePresence>
      <button
        className="fixed bottom-4 right-4 flex p-4 justify-center items-center text-white font-bold bg-rose-700 border-2 border-rose-700
             rounded-full shadow-xl cursor-pointer active:border-rose-900 active:inset-shadow-sm transition-all duration-300 ease-in-out"
      >
        <FaShoppingCart className="w-6 h-6 fill-current" />
      </button>
    </div>
  );
};

export default App;
