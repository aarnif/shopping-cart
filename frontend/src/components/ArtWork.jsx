import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router";
import { useQuery } from "@apollo/client";

import { FIND_ARTWORK } from "../graphql/queries.js";
import Loading from "./Loading.jsx";
import StarRating from "./StarRating.jsx";

const Review = ({ review }) => {
  const { name, date, rating, text } = review;

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="w-full sm:w-auto flex gap-2 sm:gap-4 items-center">
        <div className="w-10 min-w-10 h-10 md:min-w-12 md:h-12 xl:min-w-14 xl:h-14 bg-slate-300 rounded-full"></div>
        <div className="w-full flex flex-col justify-center sm:gap-1">
          <div className="min-w-[100px] flex flex-row sm:flex-col justify-between items-center sm:items-start">
            <h4 className="text-slate-700 text-xs md:text-sm xl:text-base font-semibold">
              {name}
            </h4>
            <p className="text-slate-600 text-xs md:text-sm xl:text-base">
              {date}
            </p>
          </div>
          <StarRating rating={rating} />
        </div>
      </div>
      <p className="text-slate-700 text-xs md:text-sm xl:text-base">{`"${text}"`}</p>
    </div>
  );
};

const ReviewStatistic = ({ reviews }) => {
  const distribution = [
    { rating: 1, count: 0 },
    { rating: 2, count: 0 },
    { rating: 3, count: 0 },
    { rating: 4, count: 0 },
    { rating: 5, count: 0 },
  ];

  reviews.forEach((review) => {
    distribution[review.rating - 1].count++;
  });

  return (
    <div className="w-full max-w-[500px] flex flex-col justify-center items-center gap-2">
      {distribution.reverse().map(({ rating, count }) => {
        const value = Math.round((count / reviews.length) * 100);
        return (
          <div key={rating} className="w-full flex items-center gap-4">
            <StarRating rating={rating} />
            <div className="w-full relative">
              <div className="absolute w-full h-1 bg-slate-200 rounded-lg" />
              <div
                className={`absolute h-1 bg-slate-700 ${
                  value === 100 ? "rounded-lg" : "rounded-l-lg"
                }`}
                style={{
                  width: `${value}%`,
                }}
              />
            </div>
            <div className="w-8 text-right text-slate-800 text-xs md:text-sm xl:text-base">
              {count}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ArtWork = ({ handleAddItemToCart }) => {
  const navigate = useNavigate();
  const match = useMatch("/art/:id").params;
  const [selectedSize, setSelectedSize] = useState(null);

  const { data, loading } = useQuery(FIND_ARTWORK, {
    variables: { id: match.id },
  });

  useEffect(() => {
    if (data) {
      setSelectedSize(data.findArtWork.sizes[0].dimensions);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  const { title, artist, image, description, sizes, reviews } =
    data.findArtWork;

  const selectedSizePrice = sizes.find(
    (size) => size.dimensions === selectedSize
  )?.price;

  return (
    <div className="py-32 p-4 w-full flex-grow flex flex-col items-center justify-start bg-white">
      <div className="w-full max-w-[1400px] flex flex-col items-center md:flex-row gap-4">
        <div className="flex justify-center">
          <img
            src={image}
            alt={`${title} by ${artist}`}
            className="max-w-full max-h-[700px] md:max-h-[100%] object-contain shadow-xl"
          />
        </div>

        <div className="w-full flex flex-col gap-4 md:max-w-[450px]">
          <div>
            <h2 className="text-slate-900 text-lg md:text-xl font-bold text-center font-roboto-condensed">
              {title}
            </h2>
            <h3 className="text-slate-700 text-base italic text-center">
              By {artist}
            </h3>
          </div>

          <p className="text-slate-700 text-base">{description}</p>

          <div className="w-full flex flex-wrap gap-2 justify-center items-center">
            {sizes.map(({ dimensions }) => (
              <button
                key={dimensions}
                onClick={() => setSelectedSize(dimensions)}
                className={`border border-slate-400 text-slate-700 text-xs md:text-sm py-1.5 px-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out 
                  ${
                    selectedSize === dimensions
                      ? "bg-slate-200 border-slate-700"
                      : "hover:bg-slate-200 active:border-slate-700"
                  }`}
              >
                {dimensions}
              </button>
            ))}
          </div>

          <h3
            key={selectedSizePrice}
            className="text-slate-700 text-base text-center font-semibold animate-zoom-in-and-out"
          >
            {selectedSize && selectedSizePrice} €
          </h3>

          <div className="w-full flex flex-row md:flex-col gap-2 justify-center items-center">
            <button
              className="md:w-full flex-grow basis-[50%] border border-slate-400 text-slate-700 font-semibold text-sm md:text-base xl:text-lg py-2 px-4 rounded-lg cursor-pointer 
              hover:bg-slate-100 active:border-slate-500 active:bg-slate-100 active:inset-shadow-sm transition-all duration-300 ease-in-out"
              onClick={() => navigate("/art")}
            >
              Back
            </button>
            <button
              className="md:w-full flex-grow basis-[50%] border bg-slate-800 border-slate-800 text-white font-bold text-sm md:text-base xl:text-lg py-2 px-4 rounded-lg shadow-xl cursor-pointer
          hover:bg-slate-900 hover:border-slate-900 active:bg-slate-900 active:border-black active:inset-shadow-sm transition-all duration-300 ease-in-out"
              onClick={() =>
                handleAddItemToCart(
                  data.findArtWork,
                  data.findArtWork.sizes.find(
                    (size) => size.dimensions === selectedSize
                  )
                )
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full max-w-[1400px] flex flex-col gap-4">
        <h2 className="text-slate-700 text-base md:text-lg font-bold">
          Customer Reviews ({reviews.length})
        </h2>

        <ReviewStatistic reviews={reviews} />

        <div className="sm:mt-4 w-full flex flex-col gap-4 sm:gap-6">
          {reviews.map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtWork;
