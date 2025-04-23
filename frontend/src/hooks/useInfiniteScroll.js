import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

// Made with GitHub Copilot
const useInfiniteScroll = (loadMoreCallback, hasNextPage, threshold = 0.95) => {
  const [isLoading, setIsLoading] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // Only attempt to load more when:
    // 1. We've scrolled past the threshold
    // 2. We're not already loading
    // 3. There are more items to load
    if (progress >= threshold && !isLoading && hasNextPage) {
      setIsLoading(true);

      Promise.resolve(loadMoreCallback()).finally(() => {
        setIsLoading(false);
      });
    }
  });

  return isLoading;
};

export default useInfiniteScroll;
