import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";

import { FaArrowRightLong } from "react-icons/fa6";

import { FEATURED_ARTWORKS } from "../graphql/queries.js";
import Loading from "./Loading.jsx";
import StarRating from "./StarRating.jsx";

const ArtCard = ({ data, navigate }) => {
  const {
    id,
    title,
    artist,
    image,
    description,
    type,
    sizes,
    reviews,
    averageRating,
  } = data;

  return (
    <div
      id="art-card"
      className={`w-full ${
        image.type === "portrait" && "md:max-w-[400px]"
      } flex flex-col bg-white dark:bg-slate-800 shadow-lg rounded-lg`}
    >
      <div className="w-full h-[300px] bg-slate-300 dark:bg-slate-600 rounded-t-lg">
        <img
          src={image.uri}
          alt={`${title} by ${artist}`}
          className="h-full w-full object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="p-2 md:p-4">
          <h3 className="text-slate-900 dark:text-white text-lg md:text-xl font-bold font-roboto-condensed">
            {title}
          </h3>
          <h4 className="text-slate-800 dark:text-gray-300 text-sm md:text-base italic">
            By {artist}
          </h4>
        </div>
        <p className="px-2 md:px-4 text-slate-700 dark:text-gray-200 text-sm md:text-base">
          {description}
        </p>
        <div className="w-full p-2 md:p-4 bg-slate-50 dark:bg-slate-700 flex justify-between items-center rounded-b-lg">
          <div className="flex flex-col gap-2">
            <h4 className="text-slate-900 dark:text-white text-base md:text-lg font-bold">
              {sizes[0].price} €
            </h4>
            <div className="flex gap-2 items-center">
              <StarRating rating={averageRating} />
              <p className="text-slate-700 dark:text-gray-200 text-xs md:text-base font-medium">
                {reviews.length} Reviews
              </p>
            </div>
          </div>
          <div>
            <button
              className="flex p-2 md:px-8 s:py-4 justify-center items-center text-sm md:text-base xl:text-lg text-slate-900 dark:text-white font-bold bg-slate-200 dark:bg-slate-600 border-2 border-slate-200 dark:border-slate-600 
              rounded-lg cursor-pointer hover:bg-slate-300 hover:border-slate-300 active:border-slate-400 dark:hover:bg-slate-500 dark:hover:border-slate-500 dark:active:border-slate-600 active:inset-shadow-sm transition-all duration-300 ease-in-out"
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

const ArtFeed = ({ data, navigate }) => {
  return (
    <div className="my-12 md:my-16">
      <h2
        id="art-feed-header"
        className="mb-2 md:mb-4 text-white xl:text-slate-900 xl:dark:text-slate-200 text-center font-roboto-condensed text-lg md:text-xl xl:text-2xl font-semibold"
      >
        This Month&apos;s Featured Artworks
      </h2>
      <div className="w-full flex flex-col gap-8">
        <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-end gap-8">
          <ArtCard key={data[0].id} data={data[0]} navigate={navigate} />
          <ArtCard key={data[1].id} data={data[1]} navigate={navigate} />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-8">
          <ArtCard key={data[2].id} data={data[2]} navigate={navigate} />
          <ArtCard key={data[3].id} data={data[3]} navigate={navigate} />
        </div>
      </div>
    </div>
  );
};

const HeroContent = ({ navigate }) => {
  return (
    <div
      id="hero-content"
      className="flex justify-center items-center flex-col"
    >
      <div className="xl:animate-hop-in flex flex-col items-center">
        <h1 className="text-white dark:text-white text-center font-roboto-condensed text-xl md:text-2xl xl:text-3xl font-bold">
          We are <span className="italic font-medium">cultivators</span>,{" "}
          <span className="italic font-medium">curators</span>, and{" "}
          <span className="italic font-medium">connoisseurs</span> of
        </h1>
        <h1 className="text-white dark:text-white text-center font-roboto-condensed text-xl md:text-2xl xl:text-3xl font-bold">
          artistic expression.
        </h1>
        <button
          className="flex gap-2 mt-4 px-4 py-2 justify-center items-center text-base md:text-lg xl:text-xl text-white font-bold 
          bg-rose-700 border-2 border-rose-700 rounded-lg cursor-pointer hover:bg-rose-800
          hover:border-rose-800 active:border-rose-900 active:inset-shadow-sm transition-all duration-300 ease-in-out"
          onClick={() => navigate("/art")}
        >
          <p>Buy Here</p>
          <FaArrowRightLong className="w-5 h-5 text-white dark:text-white fill-current" />
        </button>
      </div>
    </div>
  );
};

const MobileAndTabletContent = ({ loading, data, navigate }) => {
  return (
    <div className="block xl:hidden relative bg-slate-100 dark:bg-slate-900 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[100vh] before:bg-hero before:bg-cover before:bg-center before:bg-no-repeat before:border-b-4 before:border-solid before:border-rose-700">
      <div className="mt-20 md:mt-32 relative w-full px-8 md:px-12 py-8 flex flex-col">
        <HeroContent navigate={navigate} />
        {loading ? (
          <div className="mt-20 md:mt-40 w-full flex justify-center items-start">
            <Loading loadingText="Loading Art..." />
          </div>
        ) : (
          <ArtFeed data={data} navigate={navigate} />
        )}
      </div>
    </div>
  );
};

const DesktopContent = ({ loading, data, navigate }) => {
  return (
    <div className="w-full hidden xl:flex flex-col items-center bg-black">
      <div
        id="hero-background"
        className="w-full h-screen flex justify-center items-center bg-fixed bg-hero bg-cover bg-center bg-no-repeat"
      >
        <HeroContent navigate={navigate} />
      </div>
      <div className="relative w-full flex justify-center items-center border-t-4 border-rose-700 bg-slate-100 dark:bg-slate-900">
        {loading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <Loading loadingText="Loading Art..." />
          </div>
        ) : (
          <div className="w-full px-12 py-8 max-w-[1200px]">
            <ArtFeed data={data} navigate={navigate} />
          </div>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery(FEATURED_ARTWORKS);

  return (
    <>
      <MobileAndTabletContent
        loading={loading}
        data={data?.featuredArtWorks}
        navigate={navigate}
      />
      <DesktopContent
        loading={loading}
        data={data?.featuredArtWorks}
        navigate={navigate}
      />
    </>
  );
};

export default Home;
