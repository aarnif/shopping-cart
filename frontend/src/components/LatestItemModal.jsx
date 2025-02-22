import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import useResponsiveWidth from "../hooks/useResponsiveWidth";

const LatestItemModal = ({ latestItem, setShowLatestItemModal }) => {
  const navigate = useNavigate();
  const width = useResponsiveWidth();
  const isMobile = width <= 768;

  const proceedToCheckout = () => {
    console.log("Proceed to checkout");
    navigate("/cart");
    setShowLatestItemModal(false);
  };

  const continueShopping = () => {
    console.log("Continue shopping");
    setShowLatestItemModal(false);
  };

  const { title, artist, image, size } = latestItem;

  const modalVariantsMobile = {
    initial: { y: "100vh" },
    animate: { y: 0 },
    exit: { y: "100vh" },
  };

  const modalVariantsTabletAndDesktop = {
    initial: { x: "100vw" },
    animate: { x: 0 },
    exit: { x: "100vw" },
  };

  return (
    <motion.div
      key="overlay"
      className="z-10 fixed inset-0 bg-black/50 flex justify-center md:justify-end items-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        key="latestItemModal"
        variants={
          isMobile ? modalVariantsMobile : modalVariantsTabletAndDesktop
        }
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        className={`w-full md:max-w-[500px] h-[90vh] md:h-screen bg-white flex flex-col ${
          isMobile && "rounded-tl-lg rounded-tr-lg"
        }`}
      >
        <div
          className={`w-full p-4 bg-green-400 flex justify-center items-center gap-2 ${
            isMobile && "rounded-tl-lg rounded-tr-lg"
          }`}
        >
          <div className="w-6 h-6 flex justify-center items-center rounded-full bg-white">
            <FaCheck className="w-4 h-4 text-green-400 fill-current" />
          </div>
          <h1 className="text-white text-lg font-semibold font-roboto-condensed">
            Added following item to cart:
          </h1>
        </div>
        <div className="w-full flex-grow py-8 px-6 flex flex-col gap-4">
          <div className="w-full flex justify-center items-center">
            <img
              className="w-auto max-h-[200px] object-contain"
              src={image}
              alt={title}
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div>
              <h2 className="text-slate-900 text-sm font-bold font-roboto-condensed">
                {title}
              </h2>
              <h3 className="text-slate-700 text-xs italic">by {artist}</h3>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-slate-700 text-xs font-medium">
                {size.dimensions}
              </p>
              <p className="text-slate-700 text-sm font-bold">{size.price} €</p>
            </div>
          </div>
        </div>
        <div className="w-full p-4 flex flex-col gap-2">
          <button
            className="w-full py-2 px-4 bg-slate-800 rounded-lg shadow-lg flex justify-center items-center
              hover:bg-slate-900 active:bg-slate-900 active:inset-shadow-sm transition-all duration-300 ease-in-out"
            onClick={proceedToCheckout}
          >
            <p className="text-white text-sm font-bold">Checkout</p>
          </button>
          <button
            className="w-full py-2 px-4 flex justify-center items-center rounded-lg border-[0.5px] border-slate-900
              hover:bg-slate-200 active:bg-slate-200 active:inset-shadow-sm transition-all duration-300 ease-in-out"
            onClick={continueShopping}
          >
            <p className="text-slate-700 text-sm font-medium">
              Continue Shopping
            </p>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LatestItemModal;
