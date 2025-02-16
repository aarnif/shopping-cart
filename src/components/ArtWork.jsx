import { useState } from "react";
import { useMatch } from "react-router";

import { IoIosStar } from "react-icons/io";

import artworks from "../data.js";

const Review = ({ review }) => {
  const { name, date, rating, text } = review;

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex gap-2 items-center">
        <div className="w-10 min-w-10 h-10 bg-slate-300 rounded-full"></div>
        <div className="w-full flex flex-col justify-center">
          <div className="w-full flex justify-between items-center">
            <h4 className="text-slate-700 text-xs font-semibold ">{name}</h4>
            <p className="text-slate-600 text-xs">{date}</p>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, index) =>
              index < rating ? (
                <IoIosStar
                  key={index}
                  className="w-3 h-3 text-yellow-400 fill-current"
                />
              ) : (
                <IoIosStar
                  key={index}
                  className="w-3 h-3 text-slate-700 fill-current"
                />
              )
            )}
          </div>
        </div>
      </div>
      <p className="text-slate-700 text-xs">{`"${text}"`}</p>
    </div>
  );
};

const ArtWork = () => {
  const match = useMatch("/art/:id").params;
  const artwork = artworks.find((artwork) => artwork.id === Number(match.id));

  const {
    title,
    artist,
    image,
    description,
    price,
    reviews,
    averageRating,
    dimensions,
  } = artwork;

  const [selectedSize, setSelectedSize] = useState(dimensions[0].size);

  return (
    <div className="mt-16 w-full flex-grow flex flex-col items-center justify-start bg-white">
      <div className="w-full flex flex-col gap-4 p-4">
        <div className="w-full h-auto bg-slate-300 shadow-xl">
          <img
            src={image}
            alt={`${title} by ${artist}`}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-slate-900 text-xl font-bold text-center font-roboto-condensed">
            {title}
          </h2>
          <h3 className="text-slate-700 text-base italic text-center">
            By {artist}
          </h3>
        </div>

        <p className="text-slate-700 text-base">{description}</p>

        <div className="w-full flex flex-wrap gap-2 justify-center items-center">
          {dimensions.map(({ size, dimensions }) => (
            <button
              onClick={() => setSelectedSize(size)}
              className={`border border-slate-400 text-slate-700 text-xs py-1.5 px-3 rounded-full transition-all duration-300 ease-in-out 
                  ${
                    selectedSize === size
                      ? "bg-slate-200 border-slate-700"
                      : "hover:bg-slate-200 active:border-slate-700"
                  }`}
            >
              {dimensions}
            </button>
          ))}
        </div>

        <h3 className="text-slate-700 text-base text-center font-semibold">
          {price}
        </h3>

        <div className="w-full flex gap-2 justify-center items-center">
          <button className="flex-grow basis-[50%] border border-slate-400 text-slate-700 font-semibold text-sm py-2 px-4 rounded-lg transition-all duration-300 ease-in-out">
            Back
          </button>
          <button
            className="flex-grow basis-[50%] border bg-slate-800 border-slate-800 text-white font-bold text-sm py-2 px-4 rounded-lg shadow-xl
          hover:bg-slate-900 hover:border-slate-900 active:bg-slate-900 active:border-black active:inset-shadow-sm transition-all duration-300 ease-in-out"
          >
            Add to Cart
          </button>
        </div>
        <h2 className="text-slate-700 text-base font-bold">
          Customer Reviews ({reviews.length})
        </h2>
        <div className="w-full flex flex-col gap-4">
          {artwork.reviews.map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtWork;
