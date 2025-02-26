import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router";
import { useQuery } from "@apollo/client";

import { FIND_ARTWORK } from "../graphql/queries.js";
import Loading from "./Loading.jsx";
import StarRating from "./StarRating.jsx";

const FullScreenImageView = ({ fullScreenImageUri, setShowImageView }) => {
  return (
    <button
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-10 animate-fade-in"
      onClick={() => setShowImageView(false)}
    >
      <div className="p-16 w-full h-full flex justify-center items-center">
        <img
          src={fullScreenImageUri}
          alt="Full screen image"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </button>
  );
};

const Review = ({ review }) => {
  const { name, date, rating, text } = review;

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="w-full sm:w-auto flex gap-2 sm:gap-4 items-center">
        <div className="w-10 min-w-10 h-10 md:min-w-12 md:h-12 xl:min-w-14 xl:h-14 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
        <div className="w-full flex flex-col justify-center sm:gap-1">
          <div className="min-w-[100px] flex flex-row sm:flex-col justify-between items-center sm:items-start">
            <h4 className="text-slate-700 dark:text-slate-300 text-xs md:text-sm xl:text-base font-semibold">
              {name}
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm xl:text-base">
              {date}
            </p>
          </div>
          <StarRating rating={rating} />
        </div>
      </div>
      <p className="text-slate-700 dark:text-slate-300 text-xs md:text-sm xl:text-base">{`"${text}"`}</p>
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
              <div className="absolute w-full h-1 bg-slate-200 dark:bg-slate-500 rounded-lg" />
              <div
                className={`absolute h-1 bg-slate-700 dark:bg-slate-300 ${
                  value === 100 ? "rounded-lg" : "rounded-l-lg"
                }`}
                style={{
                  width: `${value}%`,
                }}
              />
            </div>
            <div className="w-8 text-right text-slate-800 dark:text-slate-100 text-xs md:text-sm xl:text-base">
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
  const [showImageView, setShowImageView] = useState(false);

  const { data, loading } = useQuery(FIND_ARTWORK, {
    variables: { id: match.id },
  });

  useEffect(() => {
    if (data) {
      setSelectedSize(data.findArtWork.sizes[0]);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="p-4 w-full flex-grow flex flex-col items-center justify-center bg-white dark:bg-slate-900">
        <Loading />
      </div>
    );
  }

  const { title, artist, image, description, sizes, reviews } =
    data?.findArtWork;

  const selectedSizePrice = sizes.find((size) => size === selectedSize)?.price;

  return (
    <div className="py-24 md:py-28 xl:py-32 px-4 md:px-6 xl:px-8 w-full flex-grow flex flex-col items-center justify-start bg-white dark:bg-slate-900">
      <div className="w-full max-w-[1400px] flex flex-col justify-center items-center md:flex-row gap-4 md:gap-8 xl:gap-16 animate-fade-from-down">
        <button
          className="flex justify-center cursor-pointer"
          onClick={() => setShowImageView(true)}
        >
          <img
            src={image.uri}
            alt={`${title} by ${artist}`}
            className="max-w-full max-h-[1000px] object-contain shadow-xl"
          />
        </button>

        <div className="w-full flex flex-col gap-4 md:max-w-[450px]">
          <div>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg md:text-xl font-bold text-center font-roboto-condensed">
              {title}
            </h2>
            <h3 className="text-slate-700 dark:text-slate-300 text-base italic text-center">
              By {artist}
            </h3>
          </div>

          <p className="text-slate-700 dark:text-slate-300 text-base">
            {description}
          </p>

          <div className="w-full flex flex-wrap gap-2 justify-center items-center">
            {sizes.map((size) => {
              // console.log("Size", size);
              return (
                <button
                  key={size.width}
                  onClick={() => setSelectedSize(size)}
                  className={`border border-slate-400 dark:border-slate-500 text-slate-700 dark:text-slate-300 text-xs md:text-sm py-1.5 px-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out 
                  ${
                    selectedSize === size
                      ? "bg-slate-200 dark:bg-slate-600 border-slate-700 dark:border-slate-400"
                      : "hover:bg-slate-200 dark:hover:bg-slate-700 active:border-slate-700 dark:active:border-slate-400"
                  }`}
                >
                  {`${size.width} x ${size.height} cm`}
                </button>
              );
            })}
          </div>

          <h3
            key={selectedSizePrice}
            className="text-slate-700 dark:text-slate-300 text-base text-center font-semibold animate-zoom-in-and-out"
          >
            {selectedSize && selectedSizePrice} €
          </h3>

          <div className="w-full flex flex-col md:flex-row gap-2 justify-center items-center">
            <button
              className="w-full flex-grow basis-[50%] border border-slate-400 dark:border-slate-500 text-slate-700 dark:text-slate-300 font-semibold text-sm md:text-base xl:text-lg py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 active:border-slate-500 dark:active:border-slate-400 active:bg-slate-100 dark:active:bg-slate-700 active:inset-shadow-sm transition-all duration-300 ease-in-out"
              onClick={() => navigate("/art")}
            >
              Back
            </button>
            <button
              className="w-full flex-grow basis-[50%] border bg-slate-800 dark:bg-slate-700 border-slate-800 dark:border-slate-700 text-white font-bold text-sm md:text-base xl:text-lg py-2 px-4 rounded-lg shadow-xl cursor-pointer hover:bg-slate-900 dark:hover:bg-slate-600 hover:border-slate-900 dark:hover:border-slate-600 active:bg-slate-900 dark:active:bg-slate-600 active:border-black dark:active:border-slate-600 active:inset-shadow-sm transition-all duration-300 ease-in-out"
              onClick={() =>
                handleAddItemToCart(
                  data.findArtWork,
                  data.findArtWork.sizes.find((size) => size === selectedSize)
                )
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full max-w-[1400px] flex flex-col gap-4 animate-fade-from-down">
        <h2 className="text-slate-700 dark:text-slate-300 text-base md:text-lg font-bold">
          Customer Reviews ({reviews.length})
        </h2>

        <ReviewStatistic reviews={reviews} />

        <div className="sm:mt-4 w-full flex flex-col gap-4 sm:gap-6">
          {reviews.map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </div>
      </div>
      {showImageView && (
        <FullScreenImageView
          fullScreenImageUri={image}
          setShowImageView={setShowImageView}
        />
      )}
    </div>
  );
};

export default ArtWork;
