import { IoIosStar } from "react-icons/io";

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) =>
        index < rating ? (
          <IoIosStar
            key={index}
            className="w-3 h-3 md:w-3.5 md:h-3.5 xl:w-4 xl:h-4 text-yellow-400 fill-current"
          />
        ) : (
          <IoIosStar
            key={index}
            className="w-3 h-3 md:w-3.5 md:h-3.5 xl:w-4 xl:h-4 text-slate-700 fill-current"
          />
        )
      )}
    </div>
  );
};

export default StarRating;
