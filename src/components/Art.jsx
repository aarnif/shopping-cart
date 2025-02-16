import { useNavigate } from "react-router";

import { IoIosStar } from "react-icons/io";

import artworks from "../data";

const Heading = () => {
  return (
    <div className="mb-4 w-full flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-900">Art</h2>
      <ul className="flex gap-1">
        <li>
          <button
            className="flex py-2 px-4 justify-center items-center text-sm text-slate-900 font-bold 
                bg-white border-1 border-slate-500 rounded-full cursor-pointer 
                active:inset-shadow-sm active:bg-slate-100 transition-all duration-300 ease-in-out"
          >
            A-Z
          </button>
        </li>
        <li>
          <button
            className="flex py-2 px-4 justify-center items-center text-sm text-slate-900 font-bold 
                bg-white border-1 border-slate-500 rounded-full cursor-pointer 
                active:inset-shadow-sm active:bg-slate-100 transition-all duration-300 ease-in-out"
          >
            Popularity
          </button>
        </li>
        <li>
          <button
            className="flex py-2 px-4 justify-center items-center text-sm text-slate-900 font-bold 
                bg-white border-1 border-slate-500 rounded-full cursor-pointer 
                active:inset-shadow-sm active:bg-slate-100 transition-all duration-300 ease-in-out"
          >
            Price
          </button>
        </li>
      </ul>
    </div>
  );
};

const ArtCard = ({ artwork }) => {
  const navigate = useNavigate();
  const { id, title, artist, image, price, averageRating } = artwork;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-slate-900 text-base sm:text-xl font-bold font-roboto-condensed">
          {title}
        </h3>
        <h4 className="text-slate-800 text-sm sm:text-base italic">
          By {artist}
        </h4>
      </div>
      <button
        className="w-full h-auto bg-slate-300"
        onClick={() => navigate(`/art/${id}`)}
      >
        <img
          src={image}
          alt={`${title} by ${artist}`}
          className="h-full w-full object-cover"
        />
      </button>
      <div className="flex justify-between items-center">
        <div className="flex">
          {[...Array(5)].map((_, index) =>
            index < averageRating ? (
              <IoIosStar
                key={index}
                className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
              />
            ) : (
              <IoIosStar
                key={index}
                className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 fill-current"
              />
            )
          )}
        </div>
        <h4 className="text-slate-900 text-base sm:text-lg font-bold">
          {price}
        </h4>
      </div>
    </div>
  );
};

const Art = () => {
  return (
    <div className="w-full py-28 px-6 min-h-screen flex flex-col items-center justify-start bg-slate-100">
      <Heading />
      <div className="w-full flex flex-col gap-8">
        {artworks.map((artwork, index) => (
          <ArtCard key={index} artwork={artwork} />
        ))}
      </div>
    </div>
  );
};

export default Art;
