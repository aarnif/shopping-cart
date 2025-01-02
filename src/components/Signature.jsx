import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Signature = () => {
  return (
    <>
      <h3 className="text-xl px-2 text-white">Created By aarnif</h3>
      <motion.div
        whileHover={{
          scale: 1.5,
          rotate: 360,
        }}
        whileTap={{ scale: 1.4 }}
        transition={{ duration: 0.5 }}
      >
        <a href="https://github.com/aarnif" target="_blank" rel="noreferrer">
          <FaGithub className="w-7 h-7 fill-current" />
        </a>
      </motion.div>
    </>
  );
};

export default Signature;
