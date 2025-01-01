import useProgressiveImg from "../hooks/useProgressiveImg";

const BlurredImage = ({ lowQualitySrc, highQualitySrc }) => {
  const [src, { blur }] = useProgressiveImg(lowQualitySrc, highQualitySrc);

  return (
    <img
      src={src}
      className="w-full h-full object-cover"
      style={{
        filter: blur ? "blur(20px)" : "none",
        transition: blur ? "none" : "filter 1s ease-out",
      }}
    />
  );
};

export default BlurredImage;
