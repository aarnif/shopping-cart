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
      data-testid="latest-item-modal-overlay"
      className="z-10 fixed inset-0 bg-black/50 flex justify-center md:justify-end items-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        data-testid="latest-item-modal"
        key="latestItemModal"
        variants={
          isMobile ? modalVariantsMobile : modalVariantsTabletAndDesktop
        }
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        className={`w-full md:max-w-[400px] xl:max-w-[600px] h-[90vh] md:h-screen bg-white dark:bg-slate-800 flex flex-col ${
          isMobile && "rounded-tl-lg rounded-tr-lg"
        }`}
      >
        <div
          className={`w-full p-4 bg-green-400 dark:bg-green-600 flex justify-center items-center gap-2 ${
            isMobile && "rounded-tl-lg rounded-tr-lg"
          }`}
        >
          <div className="w-6 h-6 flex justify-center items-center rounded-full bg-white">
            <FaCheck className="w-4 h-4 text-green-400 dark:text-green-600 fill-current" />
          </div>
          <h1 className="text-white text-lg xl:text-xl font-semibold font-roboto-condensed">
            Added following item to cart:
          </h1>
        </div>
        <div className="w-full flex-grow py-8 px-6 flex flex-col gap-4">
          <div className="w-full flex justify-center items-center">
            <img
              className="w-auto max-h-[240px] md:max-h-[320px] xl:max-h-[400px] object-contain"
              src={image.uri}
              alt={title}
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div>
              <h2 className="text-slate-900 dark:text-slate-100 text-sm md:text-base xl:text-lg font-bold font-roboto-condensed">
                {title}
              </h2>
              <h3 className="text-slate-700 dark:text-slate-300 text-xs md:text-sm xl:text-base italic">
                by {artist}
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-slate-700 dark:text-slate-300 text-xs md:text-sm xl:text-base font-medium">
                {`${size.width} x ${size.height} cm`}
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base xl:text-lg font-bold">
                {size.price} €
              </p>
            </div>
          </div>
        </div>
        <div className="w-full p-4 flex flex-col gap-2">
          <button
            data-testid="checkout-button"
            className="w-full py-2 px-4 bg-slate-800 dark:bg-slate-200 rounded-lg shadow-lg cursor-pointer flex justify-center items-center gap-2 text-white dark:text-slate-800 text-sm md:text-base xl:text-lg font-bold hover:bg-slate-900 dark:hover:bg-slate-300 active:bg-slate-900 dark:active:bg-slate-300 active:inset-shadow-sm transition-all duration-300 ease-in-out"
            onClick={proceedToCheckout}
          >
            Checkout
          </button>
          <button
            data-testid="continue-shopping-button"
            className="w-full py-2 px-4 flex justify-center items-center rounded-lg cursor-pointer border-[0.5px] border-slate-900 dark:border-slate-200 text-slate-700 dark:text-slate-200 text-sm md:text-base xl:text-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-700 active:inset-shadow-sm transition-all duration-300 ease-in-out"
            onClick={continueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LatestItemModal;
