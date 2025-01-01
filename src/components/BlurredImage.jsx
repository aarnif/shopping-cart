import useProgressiveImg from "../hooks/useProgressiveImg";

const BlurredImage = ({ lowQualitySrc, highQualitySrc }) => {
  const [src, { blur }] = useProgressiveImg(lowQualitySrc, highQualitySrc);

  return (
    <div className="relative w-full h-full">
      <img
        src={src}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{
          filter: blur ? "blur(20px)" : "none",
          transition: blur ? "none" : "filter 1s ease-out",
        }}
      />
    </div>
  );
};

export default BlurredImage;
