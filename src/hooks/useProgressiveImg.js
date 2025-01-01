import { useState, useEffect } from "react";

// Based on this blog post: https://benhoneywill.com/progressive-image-loading-with-react-hooks/
const useProgressiveImg = (lowQualitySrc, highQualitySrc) => {
  const [src, setSrc] = useState(lowQualitySrc);

  useEffect(() => {
    setSrc(lowQualitySrc);
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setSrc(highQualitySrc);
    };
  }, [lowQualitySrc, highQualitySrc]);

  return [src, { blur: src === lowQualitySrc }];
};

export default useProgressiveImg;
