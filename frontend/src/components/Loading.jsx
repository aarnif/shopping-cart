import { FaRegCircle } from "react-icons/fa6";
import { AiOutlineLoading } from "react-icons/ai";

const Loading = ({
  iconSize = "w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12",
  maxHeight = null,
  loadingText = "",
  fontSize = "text-sm md:text-base xl:text-lg",
}) => {
  return (
    <div
      data-testid="loading"
      className="w-full h-full flex flex-col justify-center items-center"
      style={{ maxHeight: maxHeight }}
    >
      <div className="relative mb-8 flex justify-center items-center">
        <FaRegCircle
          className={`${iconSize} absolute fill-current text-slate-300 dark:text-slate-600`}
        />
        <div className="absolute flex justify-center items-center animate-rotate-infinite">
          <AiOutlineLoading
            className={`${iconSize} fill-current text-slate-500 dark:text-slate-400`}
          />
        </div>
      </div>
      <p
        className={`text-slate-100 xl:text-slate-700 xl:dark:text-slate-100 ${fontSize}`}
      >
        {loadingText}
      </p>
    </div>
  );
};

export default Loading;
