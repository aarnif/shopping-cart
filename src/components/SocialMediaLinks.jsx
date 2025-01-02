import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMediaLinks = ({ isFooter }) => {
  const classStyles = isFooter
    ? "w-10 h-10 fill-current text-white transition group-hover:text-slate-900"
    : "w-10 h-10 fill-current text-slate-900 transition group-hover:text-white dark:text-white dark:group-hover:text-slate-900";

  return (
    <ul id="social-media-icons" className="flex justify-center items-center">
      <li className="group h-12 w-12 mr-2 flex justify-center items-center rounded-full cursor-pointer transition hover:bg-slate-700 active:scale-95">
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="w-full h-full flex justify-center items-center"
        >
          <FaFacebook className={classStyles} />
        </a>
      </li>
      <li className="group h-12 w-12 mr-2 flex justify-center items-center rounded-full cursor-pointer transition hover:bg-slate-700 active:scale-95">
        <a
          href="https://www.instagram.com"
          target="_blank"
          className="w-full h-full flex justify-center items-center"
        >
          <FaInstagram className={classStyles} />
        </a>
      </li>
      <li className="group h-12 w-12 mr-2 flex justify-center items-center rounded-full cursor-pointer transition hover:bg-slate-700 active:scale-95">
        <a
          href="https://www.twitter.com"
          target="_blank"
          className="w-full h-full flex justify-center items-center"
        >
          <FaXTwitter className={classStyles} />
        </a>
      </li>
    </ul>
  );
};

export default SocialMediaLinks;
