import { FaRegCircle } from "react-icons/fa6";
import { AiOutlineLoading } from "react-icons/ai";

const Loading = ({ maxHeight = null, loadingText = "" }) => {
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center"
      style={{ maxHeight: maxHeight }}
    >
      <div className="relative mb-12 flex justify-center items-center">
        <FaRegCircle className="w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 absolute fill-current text-slate-300 dark:text-slate-600" />
        <div className="absolute flex justify-center items-center animate-rotate-infinite">
          <AiOutlineLoading className="w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 fill-current text-slate-500 dark:text-slate-400" />
        </div>
      </div>
      <div className="text-slate-500">{loadingText}</div>
    </div>
  );
};

export default Loading;
