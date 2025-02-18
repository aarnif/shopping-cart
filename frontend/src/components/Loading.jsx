import { FaRegCircle } from "react-icons/fa6";
import { AiOutlineLoading } from "react-icons/ai";
import { motion } from "framer-motion";

const Loading = ({ maxHeight = null, loadingText = "" }) => {
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center"
      style={{ maxHeight: maxHeight }}
    >
      <div className="relative mb-12 flex justify-center items-center">
        <FaRegCircle className="w-8 h-8 absolute fill-current text-slate-300" />
        <motion.div
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ repeat: Infinity }}
          className="absolute flex justify-center items-center"
        >
          <AiOutlineLoading className="w-8 h-8 fill-current text-slate-500" />
        </motion.div>
      </div>
      <div className="text-slate-500">{loadingText}</div>
    </div>
  );
};

export default Loading;
