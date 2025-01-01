import BlurredImage from "./BlurredImage";

const Hero = ({ randomArtPiece }) => {
  return (
    <div className="w-full flex-grow h-[700px] mt-[60px] flex justify-center items-center bg-slate-500">
      {randomArtPiece && (
        <BlurredImage
          lowQualitySrc={randomArtPiece.tinyImage}
          highQualitySrc={randomArtPiece.image}
        />
      )}
    </div>
  );
};

export default Hero;
