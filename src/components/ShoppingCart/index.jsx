import { useRef, useState } from "react";

import { FaPlus, FaMinus } from "react-icons/fa";
import { TiArrowRightThick } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";

const ShoppingCartHeaderRow = () => {
  return (
    <thead>
      <tr>
        <th className="w-[500px]">Product</th>
        <th>Title</th>
        <th>Size</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
    </thead>
  );
};

const ShoppingCartItem = ({ item, setShoppingCart, setTotalSumOfItems }) => {
  console.log("Shopping cart item:", item);
  const [quantity, setQuantity] = useState(Number(item.quantity));

  const [artWidth, artHeight] = item.aspectRatio.split(":");

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    item.quantity = quantity + 1;
    setTotalSumOfItems((prevTotalSum) => prevTotalSum + item.price);
  };

  const handleDecreaseQuantity = () => {
    if (quantity - 1 === 0) {
      setShoppingCart((prevShoppingCart) =>
        prevShoppingCart.filter((cartItem) => cartItem.id !== item.id)
      );
      setTotalSumOfItems((prevTotalSum) => prevTotalSum - item.price);
      return;
    }

    setQuantity(quantity - 1);
    item.quantity = quantity - 1;
    setTotalSumOfItems((prevTotalSum) => prevTotalSum - item.price);
  };
  return (
    <tr>
      <td className="w-[500px] flex justify-center items-center my-8">
        <div
          className="bg-slate-400"
          style={{
            width: Number(artWidth) * 10,
            height: Number(artHeight) * 10,
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </td>
      <td className="text-center">{item.title}</td>
      <td className="text-center">
        {item.chosenSize} ({item.size[item.chosenSize].width} x{" "}
        {item.size[item.chosenSize].height} inches)
      </td>
      <td className="text-center">{item.price} $</td>
      <td className="text-center">
        <div className="flex justify-center items-center">
          <button
            onClick={handleIncreaseQuantity}
            className="w-[40px] h-[40px] flex justify-center items-center border-2 border-slate-700 bg-white
            hover:bg-slate-200 active:scale-95 transition dark:bg-slate-600 dark:hover:bg-slate-700"
          >
            <FaPlus className="w-6 h-6 fill-current" />
          </button>
          <div className="w-[60px] h-[40px] flex justify-center items-center border-2 border-slate-700 bg-white text-2xl font-bold dark:bg-slate-600">
            {quantity}
          </div>
          <button
            className="w-[40px] h-[40px] flex justify-center items-center border-2 border-slate-700 bg-white
            hover:bg-slate-200 active:scale-95 transition dark:bg-slate-600 dark:hover:bg-slate-700"
            onClick={handleDecreaseQuantity}
          >
            <FaMinus className="w-6 h-6 fill-current" />
          </button>
        </div>
      </td>
      <td className="w-[100px] text-center">{item.price * quantity} $</td>
    </tr>
  );
};

const ShoppingCartItems = ({
  shoppingCart,
  setShoppingCart,
  setTotalSumOfItems,
}) => {
  return (
    <>
      <h1 className="mb-12 text-2xl font-bold text-center">Shopping Cart</h1>
      {!shoppingCart.length ? (
        <div className="flex-grow mt-8 text-center text-xl">
          Your shopping cart is empty.
        </div>
      ) : (
        <table className="text-xl">
          <ShoppingCartHeaderRow />
          <tbody>
            {shoppingCart.map((item, index) => (
              <ShoppingCartItem
                key={index}
                item={item}
                setShoppingCart={setShoppingCart}
                setTotalSumOfItems={setTotalSumOfItems}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

const ShoppingCart = ({ shoppingCart, setShoppingCart }) => {
  const proceedToCheckoutModalRef = useRef(null);
  const [totalSumOfItems, setTotalSumOfItems] = useState(
    shoppingCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const buttonTextVariants = {
    initial: { x: 20 },
    hover: { x: 0 },
  };

  const buttonIconVariants = {
    initial: { x: -10, opacity: 0 },
    hover: { x: 0, opacity: 1 },
  };

  return (
    <>
      <div className="w-full flex-grow max-w-[1600px] my-24 flex flex-col">
        <ShoppingCartItems
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
          setTotalSumOfItems={setTotalSumOfItems}
        />
        <div className="flex justify-end">
          <div className="flex flex-col justify-around text-3xl font-bold">
            <div className="min-w-[300px] mb-8 flex justify-around items-center">
              <div>Total:</div>
              <div>{totalSumOfItems} $</div>
            </div>
            <AnimatePresence>
              <motion.button
                initial="initial"
                whileHover="hover"
                className="confirm-button flex justify-center items-center bg-green-500 hover:bg-green-400"
                onClick={() => proceedToCheckoutModalRef.current.showModal()}
              >
                <motion.div
                  transition={{ duration: 0.5, type: "tween" }}
                  variants={buttonTextVariants}
                >
                  Proceed To Checkout
                </motion.div>

                <motion.div
                  key="arrow-right"
                  className="ml-2"
                  transition={{ duration: 0.5, type: "tween" }}
                  variants={buttonIconVariants}
                >
                  <TiArrowRightThick className="w-8 h-8 fill-current" />
                </motion.div>
              </motion.button>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <dialog ref={proceedToCheckoutModalRef}>
        <div className="w-[500px] h-[280px] bg-white flex flex-col justify-center items-center dark:bg-slate-700 dark:text-slate-300">
          <h1 className="text-2xl font-bold mb-12">
            Checkout Not Implemented!
          </h1>
          <div className="flex justify-around w-full">
            <button
              className="confirm-button"
              onClick={() => proceedToCheckoutModalRef.current.close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ShoppingCart;
