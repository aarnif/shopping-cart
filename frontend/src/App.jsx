import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Routes, Route, useNavigate, useLocation } from "react-router";

import { v4 as uuidv4 } from "uuid";
import { FaShoppingCart } from "react-icons/fa";

import Header from "./components/Header";
import Home from "./components/Home";
import Art from "./components/Art";
import ArtWork from "./components/ArtWork";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import LatestItemModal from "./components/LatestItemModal";
import AlertModal from "./components/AlertModal";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLatestItemModal, setShowLatestItemModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [latestItem, setLatestItem] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleAddItemToCart = (artWork, selectedSize) => {
    console.log("Add art work to cart:", artWork.id);

    console.log("Selected size:", selectedSize);

    const newItem = {
      id: uuidv4(),
      title: artWork.title,
      artist: artWork.artist,
      image: artWork.image,
      size: selectedSize,
      quantity: 1,
    };

    console.log("New item:", newItem);

    const checkIfItemWithSameSizeAndTitleInCart = shoppingCart.find(
      (item) => newItem.title === item.title && newItem.size === item.size
    );

    if (checkIfItemWithSameSizeAndTitleInCart) {
      console.log("Item with same size already in cart, increase quantity");
      const updatedCart = shoppingCart.map((item) =>
        item.title === newItem.title && item.size === newItem.size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setShoppingCart(updatedCart);
    } else {
      setShoppingCart((prevState) => [...prevState, newItem]);
    }
    setLatestItem(newItem);

    if (location.pathname !== "/cart") {
      setShowLatestItemModal(true);
    }
  };

  const handleRemoveItemFromCart = (id) => {
    console.log("Remove item from cart:", id);

    const checkIfItemHasOneQuantityLeft = shoppingCart.find(
      (item) => item.id === id && item.quantity === 1
    );

    if (checkIfItemHasOneQuantityLeft) {
      console.log("Item has one quantity, remove from cart");
      setShoppingCart((prevState) =>
        prevState.filter((item) => item.id !== id)
      );
    } else {
      console.log("Item has more than one quantity, decrease quantity");
      setShoppingCart((prevState) =>
        prevState.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const numberOfItemsInCart = shoppingCart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="w-full min-h-screen flex flex-col animate-fade-in">
      <Header
        handleShowMenu={handleShowMenu}
        shoppingCart={shoppingCart}
        numberOfItemsInCart={numberOfItemsInCart}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/art" element={<Art />} />
        <Route
          path="/art/:id"
          element={<ArtWork handleAddItemToCart={handleAddItemToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              shoppingCart={shoppingCart}
              handleAddItemToCart={handleAddItemToCart}
              handleRemoveItemFromCart={handleRemoveItemFromCart}
              handleShowAlertModal={() => setShowAlertModal(true)}
            />
          }
        />
      </Routes>
      <Footer />
      <AnimatePresence>
        {showMenu && <Menu handleShowMenu={handleShowMenu} />}
        {showLatestItemModal && (
          <LatestItemModal
            latestItem={latestItem}
            setShowLatestItemModal={setShowLatestItemModal}
          />
        )}
        {showAlertModal && (
          <AlertModal
            title="Alert!"
            message="The proceed from checkout is not implemented!"
            handleClose={() => setShowAlertModal(false)}
          />
        )}
      </AnimatePresence>
      {location.pathname !== "/cart" && (
        <button
          className="fixed bottom-4 right-4 flex sm:hidden p-3 justify-center items-center text-white font-bold bg-rose-700 border-2 border-rose-700
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
