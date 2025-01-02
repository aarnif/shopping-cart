import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { AnimatePresence, motion } from "framer-motion";

const SingleArtImageView = ({
  artTitle,
  artImageURL,
  handleMoveToPreviousImage,
  handleMoveToNextImage,
}) => {
  const [hovered, setHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState("right");

  const handleChangeImageToPrevious = () => {
    setSlideDirection("left");
    handleMoveToPreviousImage();
  };

  const handleChangeImageToNext = () => {
    setSlideDirection("right");
    handleMoveToNextImage();
  };

  return (
    <AnimatePresence>
      <div className="h-full flex-grow basis-3/4 overflow-hidden">
        <div className="h-full w-full bg-slate-900 flex justify-center items-center">
          <motion.div
            key={artTitle}
            style={{
              backgroundImage: `url(${artImageURL})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="h-full w-full flex justify-center items-center"
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            initial={{ x: slideDirection === "right" ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: slideDirection === "right" ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {hovered && (
              <div className="flex-grow flex justify-center items-center">
                <ul className="flex-grow flex justify-between items-center px-8">
                  <li>
                    <button onClick={handleChangeImageToPrevious}>
                      <Icon
                        path={mdiChevronLeft}
                        size={3}
                        className="fill-current text-white transition hover:text-slate-200 active:scale-95"
                      />
                    </button>
                  </li>
                  <li>
                    <button onClick={handleChangeImageToNext}>
                      <Icon
                        path={mdiChevronRight}
                        size={3}
                        className="fill-current text-white transition hover:text-slate-200 active:scale-95"
                      />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

const SingleArtItemDetails = ({
  art,
  shoppingCart,
  setShoppingCart,
  setLatestShoppingCartItem,
  setShowSingleArtView,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Item added to cart");
    const chosenSize = event.target.size.value;
    const quantity = event.target.quantity.value;

    const newItem = {
      ...art,
      id: uuidv4(), // Generate a unique id for the item so that removing same item with different sizes works correctly
      quantity: quantity,
      chosenSize: chosenSize,
      size: { [chosenSize]: art.size[chosenSize] },
    };

    setLatestShoppingCartItem(newItem);

    const checkIfItemWithSameSizeAndTitleInCart = shoppingCart.find(
      (item) => item.title === art.title && item.chosenSize === chosenSize
    );

    if (checkIfItemWithSameSizeAndTitleInCart) {
      const updatedCart = shoppingCart.map((item) =>
        item.title === art.title && item.chosenSize === chosenSize
          ? { ...item, quantity: Number(item.quantity) + Number(quantity) }
          : item
      );
      setShoppingCart(updatedCart);
    } else {
      setShoppingCart((prev) => [...prev, newItem]);
    }

    closeModal();
  };

  const closeModal = () => {
    setShowSingleArtView(false);
  };

  return (
    <div className="h-full flex-grow basis-1/4 flex flex-col justify-between py-8 px-12">
      <div>
        <h1 className="text-center text-2xl font-bold mt-20 dark:text-white">
          {art.title}
        </h1>
        <h2 className="text-center text-xl font-medium text-slate-700 dark:text-slate-100">
          By {art.artist}
        </h2>
      </div>
      <div>
        <h3 className="text-center italic text-slate-700 dark:text-slate-100">
          {art.description}
        </h3>
      </div>
      <div>
        <h3 className="text-center italic text-slate-700 dark:text-slate-100">
          All of our prints are individually printed and hand signed by the
          artist.
        </h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <ul>
            <li className="flex justify-center items-center mb-6">
              <ul className="flex-grow max-w-[400px] flex justify-between items-center">
                <li>
                  <label
                    htmlFor="size"
                    className="text-xl font-medium text-slate-700 dark:text-slate-100"
                  >
                    Size:
                  </label>
                </li>
                <li>
                  <select
                    name="size"
                    defaultValue={"medium"}
                    className="min-w-[250px] text-center text-lg bg-white shadow-xl rounded-md px-4 py-2 text-slate-700 border border-slate-400 
                      hover:bg-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-slate-100 placeholder:text-slate-500
                      dark:text-slate-300 dark:placeholder:text-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 dark:focus:bg-slate-500"
                  >
                    <option value="small">
                      Small ({art.size.small.width} x {art.size.small.height}{" "}
                      inches)
                    </option>
                    <option value="medium">
                      Medium ({art.size.medium.width} x {art.size.medium.height}{" "}
                      inches)
                    </option>
                    <option value="large">
                      Large ({art.size.large.width} x {art.size.large.height}{" "}
                      inches)
                    </option>
                  </select>
                </li>
              </ul>
            </li>

            <li className="flex justify-center items-center mb-12">
              <ul className="flex-grow max-w-[400px] flex justify-between items-center">
                <li>
                  <label
                    htmlFor="quantity"
                    className="text-xl font-medium text-slate-700 dark:text-slate-100"
                  >
                    Quantity:
                  </label>
                </li>
                <li>
                  <input
                    className="max-w-[100px] text-center text-xl font-medium bg-white shadow-xl rounded-md px-4 py-2 text-slate-700
                      hover:bg-slate-100 border border-slate-400 
                      focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-slate-100 placeholder:text-slate-500
                      dark:text-slate-300 dark:placeholder:text-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 dark:focus:bg-slate-500"
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    defaultValue={1}
                  />
                </li>
              </ul>
            </li>

            <li>
              <ul className="w-full my-4 flex flex-col items-center">
                <li className="w-full flex justify-center items-center">
                  <button type="submit" className="confirm-button">
                    Add to cart
                  </button>
                </li>
                <li className="w-full flex justify-center items-center">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

const SingleArtItemView = ({
  art,
  handleMoveToPreviousImage,
  handleMoveToNextImage,
  shoppingCart,
  setShoppingCart,
  setLatestShoppingCartItem,
  setShowSingleArtView,
}) => {
  return (
    <div className="z-10 fixed inset-0 flex justify-center items-center bg-slate-800 bg-opacity-90">
      <div className="w-[90vw] h-[90vh] flex justify-center bg-slate-200 dark:bg-slate-800">
        <div className="w-full flex justify-between items-center p-12 dark:bg-slate-700">
          <SingleArtImageView
            artTitle={art.title}
            artImageURL={art.image}
            handleMoveToPreviousImage={handleMoveToPreviousImage}
            handleMoveToNextImage={handleMoveToNextImage}
          />
          <SingleArtItemDetails
            art={art}
            shoppingCart={shoppingCart}
            setShoppingCart={setShoppingCart}
            setLatestShoppingCartItem={setLatestShoppingCartItem}
            setShowSingleArtView={setShowSingleArtView}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleArtItemView;
