import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";

import { FaArrowRightLong } from "react-icons/fa6";

import { ALL_ARTWORKS } from "../graphql/queries.js";
import Loading from "./Loading.jsx";
import StarRating from "./StarRating.jsx";

const ArtCard = ({ data }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    artist,
    image,
    description,
    sizes,
    reviews,
    averageRating,
  } = data;

  return (
    <div
      id="art-card"
      className="w-full flex flex-col bg-white shadow-lg rounded-lg"
    >
      <div className="w-full h-[300px] bg-slate-300 rounded-t-lg">
        <img
          src={image}
          alt={`${title} by ${artist}`}
          className="h-full w-full object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="p-2 sm:p-4">
          <h3 className="text-slate-900 text-lg sm:text-xl font-bold font-roboto-condensed">
            {title}
          </h3>
          <h4 className="text-slate-800 text-sm sm:text-base italic">
            By {artist}
          </h4>
        </div>
        <p className="p-2 sm:p-4 text-slate-700 text-sm sm:text-base">
          {description}
        </p>
        <div className="w-full p-2 sm:p-4 bg-slate-50 flex justify-between items-center rounded-b-lg">
          <div className="flex flex-col gap-2">
            <h4 className="text-slate-900 text-base sm:text-lg font-bold">
              {sizes[0].price} €
            </h4>
            <div className="flex gap-2 items-center">
              <StarRating rating={averageRating} />
              <p className="text-slate-700 text-xs sm:text-base font-medium">
                {reviews.length} Reviews
              </p>
            </div>
          </div>
          <div>
            <button
              className="flex p-2 sm:px-8 s:py-4 justify-center items-center text-sm sm:text-base text-slate-900 font-bold bg-slate-200 border-2 border-slate-200 
            rounded-lg cursor-pointer active:border-slate-400 active:inset-shadow-sm transition-all duration-300 ease-in-out"
              onClick={() => navigate(`/art/${id}`)}
            >
              Buy Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { data, loading } = useQuery(ALL_ARTWORKS);

  if (loading) {
    return <Loading />;
  }

  const monthsFeatureArtworks = data.allArtWorks.slice(0, 4);

  return (
    <div className="relative bg-slate-100 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[100vh] before:bg-hero before:bg-cover before:bg-center before:bg-no-repeat">
      <div className="mt-20 relative w-full p-8 flex flex-col">
        <div className="animate-hop-in flex justify-center items-center flex-col">
          <h1 className="text-white text-center font-roboto-condensed text-2xl font-bold">
            We are <span className="italic font-medium">cultivators</span>,{" "}
            <span className="italic font-medium">curators</span>, and{" "}
            <span className="italic font-medium">connoisseurs</span> of
          </h1>
          <h1 className="text-white text-center font-roboto-condensed text-2xl font-bold">
            artistic expression.
          </h1>
          <button
            className="flex gap-2 mt-4 px-4 py-2 justify-center items-center text-white font-bold bg-rose-700 border-2 border-rose-700
             rounded-lg cursor-pointer active:border-rose-900 active:inset-shadow-sm transition-all duration-300 ease-in-out"
          >
            <p>Buy Here</p>
            <FaArrowRightLong className="w-5 h-5 text-white fill-current" />
          </button>
        </div>
        <div className="my-12">
          <h2 className="mb-2 text-white text-center font-roboto-condensed text-xl font-semibold">
            This Month&apos;s Featured Artworks
          </h2>
          <div className="w-full flex flex-col gap-8">
            {monthsFeatureArtworks.map((artwork, index) => (
              <ArtCard key={index} index={index} data={artwork} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
