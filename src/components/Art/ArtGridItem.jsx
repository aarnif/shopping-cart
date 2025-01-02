import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ArtGridItem = ({
  artPiece,
  index,
  setArtItemIndex,
  setShowSingleArtView,
}) => {
  const [artWidth, artHeight] = artPiece.aspectRatio.split(":");
  const aspectRatio = artWidth / artHeight;
  const itemHeight = 350;

  const handleClick = () => {
    setArtItemIndex(index);
    setShowSingleArtView(true);
  };

  const variants = {
    hidden: { opacity: 0 },
    hover: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="flex-grow m-1 flex justify-center items-center bg-slate-300 cursor-pointer"
        style={{
          width: aspectRatio * itemHeight,
          height: itemHeight,
          backgroundImage: `url(${artPiece.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0,
        }}
        initial="hidden"
        whileHover="hover"
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.7,
        }}
        viewport={{ once: true }}
        onClick={handleClick}
      >
        <motion.div
          variants={variants}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full flex flex-col justify-center items-center bg-slate-900 bg-opacity-50 text-slate-200 text-xl"
        >
          <div>{artPiece.title}</div>
          <div>Click to expand</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArtGridItem;
