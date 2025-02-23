import { motion } from "framer-motion";
import { FaExclamation } from "react-icons/fa6";

const AlertModal = ({ title, message, handleClose }) => {
  return (
    <motion.div
      key={"overlay"}
      className="z-10 fixed inset-0 bg-black/50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        key={"latestItemModal"}
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "100vh" }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        className="bg-yellow-50 rounded-lg border-t border-yellow-900"
      >
        <div className="w-full p-4 md:p-6 flex flex-col gap-4">
          <div className="flex justify-start items-center gap-3">
            <div className="w-8.5 h-8.5 md:w-10 md:h-10 flex justify-center items-center rounded-full bg-yellow-300">
              <div className="w-6 h-6 md:w-7 md:h-7 flex justify-center items-center rounded-full bg-yellow-100 border-2 border-yellow-400">
                <FaExclamation className="w-4 h-4 md:w-4.5 md:h-4.5 text-yellow-900 fill-current" />
              </div>
            </div>
            <h2 className="text-center text-yellow-900 text-lg md:text-xl font-semibold font-robo-condensed">
              {title}
            </h2>
          </div>
          <div className="self-stretch h-12 text-yellow-700 text-sm md:text-base">
            {message}
          </div>

          <button
            className="w-full px-4 py-2 bg-yellow-200 rounded-lg border border-yellow-200 shadow-xl flex justify-center items-center text-yellow-900 cursor-pointer text-sm md:text-base xl:text-lg font-bold
              hover:bg-yellow-300 active:bg-yellow-300 active:border-yellow-400 active:inset-shadow-sm transition-all duration-300 ease-in-out"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AlertModal;
