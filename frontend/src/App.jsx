import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Routes, Route, useNavigate, useLocation } from "react-router";

import { FaShoppingCart } from "react-icons/fa";

import Header from "./components/Header";
import Home from "./components/Home";
import Art from "./components/Art";
import ArtWork from "./components/ArtWork";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [shoppingCart, setShoppingCart] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const numberOfItemsInCart = shoppingCart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="w-full min-h-screen flex flex-col animate-fade-in">
      <Header handleShowMenu={handleShowMenu} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/art" element={<Art />} />
        <Route
          path="/art/:id"
          element={
            <ArtWork
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          }
        />
      </Routes>
      <Footer />
      <AnimatePresence>
        {showMenu && <Menu handleShowMenu={handleShowMenu} />}
      </AnimatePresence>
      {location.pathname !== "/cart" && (
        <button
          className="fixed bottom-4 right-4 flex p-3 justify-center items-center text-white font-bold bg-rose-700 border-2 border-rose-700
             rounded-full shadow-xl cursor-pointer active:border-rose-900 active:inset-shadow-sm transition-all duration-300 ease-in-out"
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart className="w-6 h-6 fill-current" />
          {shoppingCart.length > 0 && (
            <div
              key={numberOfItemsInCart}
              className={`absolute -bottom-1 -right-1 w-4.5 h-4.5 flex justify-center items-center bg-green-700 text-white text-xs font-bold rounded-full ${
                numberOfItemsInCart === 1
                  ? "animate-scale-in"
                  : "animate-zoom-in-and-out"
              }`}
            >
              {numberOfItemsInCart}
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export default App;
