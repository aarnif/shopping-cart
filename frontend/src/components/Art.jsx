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
    <div className="mb-4 w-full flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-900">Art</h2>
      <ul className="flex gap-1 sm:gap-2">
        {buttons.map((button) => (
          <li key={button.name}>
            <button
              className={`flex py-1.25 px-2.5 justify-center items-center text-sm text-slate-900 font-medium
              ${
                selectedSort === button.name ? "bg-slate-200 " : "bg-white"
              } border-1 border-slate-500 rounded-full cursor-pointer 
              active:inset-shadow-sm active:bg-slate-100 transition-all duration-300 ease-in-out`}
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

const ArtCard = ({ artwork }) => {
  const navigate = useNavigate();
  const { id, title, artist, image, sizes, averageRating } = artwork;

  return (
    <div className="mb-2 w-full flex flex-col gap-2 break-inside-avoid">
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
    <div className="w-full pt-28 pb-14 px-6 min-h-screen flex flex-col items-center justify-start bg-slate-100">
      <Heading selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      {loading ? (
        <div className="mt-8">
          <Loading />
        </div>
      ) : (
        <>
          <div key={"art"} className="columns-1 md:columns-2 gap-4">
            {data.allArtWorks.edges.map((edge, index) => (
              <ArtCard key={index} artwork={edge.node} />
            ))}
          </div>
          {!data.allArtWorks.pageInfo.hasNextPage && (
            <div className="mt-8 text-slate-700 text-sm font-medium">
              No more artworks available.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Art;
