import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import ArtGridItem from "./ArtGridItem";
import SingleArtItemView from "./SingleArtItemView";

const ArtGrid = ({
  art,
  shoppingCart,
  setShoppingCart,
  setLatestShoppingCartItem,
}) => {
  const [showSingleArtView, setShowSingleArtView] = useState(false);
  const [artItemIndex, setArtItemIndex] = useState(0);

  const handleMoveToPreviousImage = () => {
    console.log("Previous image clicked");
    const previousIndexValue =
      artItemIndex === 0 ? art.length - 1 : artItemIndex - 1;
    console.log("New index value:", previousIndexValue);
    setArtItemIndex(previousIndexValue);
    console.log("Previous image:", art[previousIndexValue].title);
  };

  const handleMoveToNextImage = () => {
    console.log("Next image clicked");
    const nextIndexValue =
      artItemIndex === art.length - 1 ? 0 : artItemIndex + 1;
    console.log("New index value:", nextIndexValue);
    setArtItemIndex(nextIndexValue);
    console.log("Next image:", art[nextIndexValue].title);
  };

  return (
    <>
      <h1 className="w-full mb-12 flex-grow text-2xl text-center font-bold">
        Art Works
      </h1>
      <div className="w-full flex flex-wrap justify-center items-center">
        {art.map((artPiece, index) => (
          <ArtGridItem
            key={index}
            artPiece={artPiece}
            index={index}
            setArtItemIndex={setArtItemIndex}
            setShowSingleArtView={setShowSingleArtView}
          />
        ))}
      </div>
      <AnimatePresence>
        {showSingleArtView && (
          <SingleArtItemView
            art={art[artItemIndex]}
            handleMoveToPreviousImage={handleMoveToPreviousImage}
            handleMoveToNextImage={handleMoveToNextImage}
            shoppingCart={shoppingCart}
            setShoppingCart={setShoppingCart}
            setLatestShoppingCartItem={setLatestShoppingCartItem}
            setShowSingleArtView={setShowSingleArtView}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ArtGrid;
