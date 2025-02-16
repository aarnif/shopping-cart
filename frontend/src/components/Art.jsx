import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";

import { ALL_ARTWORKS } from "../graphql/queries.js";
import Loading from "./Loading.jsx";
import StarRating from "./StarRating";

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
  const { id, title, artist, image, sizes, averageRating } = artwork;

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
        <StarRating rating={averageRating} />
        <h4 className="text-slate-900 text-base sm:text-lg font-bold">
          {sizes[0].price} €
        </h4>
      </div>
    </div>
  );
};

const Art = () => {
  const { data, loading } = useQuery(ALL_ARTWORKS);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full py-28 px-6 min-h-screen flex flex-col items-center justify-start bg-slate-100">
      <Heading />
      <div className="w-full flex flex-col gap-8">
        {data.allArtWorks.map((artwork, index) => (
          <ArtCard key={index} artwork={artwork} />
        ))}
      </div>
    </div>
  );
};

export default Art;
