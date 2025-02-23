import { useNavigate } from "react-router";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useScroll, useMotionValueEvent } from "framer-motion";

import { ALL_ARTWORKS } from "../graphql/queries.js";
import Loading from "./Loading.jsx";
import StarRating from "./StarRating";

const Heading = ({ selectedSort, setSelectedSort }) => {
  const buttons = [
    {
      name: "title",
      text: "Title",
      callback: () => setSelectedSort("title"),
    },
    {
      name: "artist",
      text: "Artist",
      callback: () => setSelectedSort("artist"),
    },
    {
      name: "rating",
      text: "Rating",
      callback: () => setSelectedSort("rating"),
    },
    {
      name: "price",
      text: "Price",
      callback: () => setSelectedSort("price"),
    },
  ];

  return (
    <div className="mb-4 w-full max-w-[1400px] flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        Art
      </h2>
      <ul className="flex gap-1 sm:gap-2">
        {buttons.map((button) => (
          <li key={button.name}>
            <button
              className={`flex py-1.25 px-2.5 justify-center items-center text-sm text-slate-900 dark:text-slate-100 font-medium ${
                selectedSort === button.name
                  ? "bg-slate-200 dark:bg-slate-700"
                  : "bg-white dark:bg-slate-800"
              } border-1 border-slate-500 dark:border-slate-600 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 active:inset-shadow-sm active:bg-slate-100 dark:active:bg-slate-700 transition-all duration-300 ease-in-out`}
              onClick={button.callback}
            >
              {button.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ArtWorkTitle = ({ title, artist }) => (
  <div className="w-full flex justify-between items-center">
    <h3 className="text-slate-900 dark:text-slate-50 xl:text-slate-50 text-base sm:text-xl font-bold font-roboto-condensed">
      {title}
    </h3>
    <h4 className="text-slate-800 dark:text-slate-200 xl:text-slate-200 text-sm sm:text-base italic">
      By {artist}
    </h4>
  </div>
);

const ArtWorkReviewsAndPrice = ({ averageRating, sizes }) => (
  <div className="flex justify-between items-center">
    <StarRating rating={averageRating} />
    <h4 className="text-slate-900 dark:text-slate-200 xl:text-slate-200 text-base sm:text-lg font-bold">
      {sizes[0].price} €
    </h4>
  </div>
);

const MobileAndTabletView = ({ artwork, navigate }) => {
  const { id, title, artist, image, sizes, averageRating } = artwork;

  return (
    <div className="mb-2 w-full flex xl:hidden flex-col gap-2">
      <ArtWorkTitle title={title} artist={artist} />
      <button
        className="w-full h-auto bg-slate-300 dark:bg-slate-600 cursor-pointer"
        onClick={() => navigate(`/art/${id}`)}
      >
        <ArtWorkImage image={image} title={title} artist={artist} />
      </button>
      <ArtWorkReviewsAndPrice averageRating={averageRating} sizes={sizes} />
    </div>
  );
};

const ArtWorkImage = ({ image, title, artist }) => (
  <img
    src={image}
    alt={`${title} by ${artist}`}
    className="h-full w-full object-cover"
  />
);

const DesktopView = ({ artwork, navigate }) => {
  const { id, title, artist, image, sizes, averageRating } = artwork;

  return (
    <div className="relative mb-2 xl:mb-4 w-full hidden xl:flex flex-col group">
      <ArtWorkImage image={image} title={title} artist={artist} />
      <button
        className="absolute inset-0 p-4 flex flex-col justify-between bg-black/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
        onClick={() => navigate(`/art/${id}`)}
      >
        <ArtWorkTitle title={title} artist={artist} />
        <ArtWorkReviewsAndPrice averageRating={averageRating} sizes={sizes} />
      </button>
    </div>
  );
};

const ArtCard = ({ artwork }) => {
  const navigate = useNavigate();

  return (
    <div className="break-inside-avoid">
      <MobileAndTabletView artwork={artwork} navigate={navigate} />
      <DesktopView artwork={artwork} navigate={navigate} />
    </div>
  );
};

const Art = () => {
  const numberOfArtworksToBeFetched = 20;
  const [selectedSort, setSelectedSort] = useState("title");
  const { data, loading, fetchMore } = useQuery(ALL_ARTWORKS, {
    variables: {
      sortBy: selectedSort,
      first: numberOfArtworksToBeFetched,
      after: null,
    },
    fetchPolicy: "cache-and-network",
  });

  // Infinite scroll that loads more artworks when the user reaches the bottom of the page
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress >= 0.99) {
      loadMore();
    }
  });

  const loadMore = () => {
    if (!data?.allArtWorks?.pageInfo?.hasNextPage) return;

    fetchMore({
      variables: {
        after: data.allArtWorks.pageInfo.endCursor,
        sortBy: selectedSort,
        first: numberOfArtworksToBeFetched,
      },
      updateQuery: (previousData, { fetchMoreResult }) => {
        if (
          !fetchMoreResult ||
          fetchMoreResult.allArtWorks.edges.length === 0
        ) {
          return previousData;
        }

        return {
          allArtWorks: {
            __typename: previousData.allArtWorks.__typename,
            totalCount: fetchMoreResult.allArtWorks.totalCount,
            edges: [
              ...previousData.allArtWorks.edges,
              ...fetchMoreResult.allArtWorks.edges,
            ],
            pageInfo: fetchMoreResult.allArtWorks.pageInfo,
          },
        };
      },
    });
  };

  return (
    <div className="w-full pt-28 pb-14 px-6 min-h-screen flex flex-col items-center justify-start bg-slate-100 dark:bg-slate-800">
      <Heading selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      {loading ? (
        <div className="mt-8">
          <Loading />
        </div>
      ) : (
        <>
          <div
            key={"art"}
            className="w-full max-w-[1400px] columns-1 md:columns-2 xl:columns-3 gap-4"
          >
            {data.allArtWorks.edges.map((edge, index) => (
              <ArtCard key={index} artwork={edge.node} />
            ))}
          </div>
          {!data.allArtWorks.pageInfo.hasNextPage && (
            <div className="mt-8 text-slate-700 dark:text-slate-300 text-sm font-medium">
              No more artworks available.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Art;
