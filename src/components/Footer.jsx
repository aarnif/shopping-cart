import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="p-2 w-full flex flex-col justify-center items-center bg-white text-slate-900">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <ul className="flex gap-8">
          <li>
            <button className="flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out">
              <FaFacebook className="w-5 h-5 fill-current" />
            </button>
          </li>
          <li>
            <button className="flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out">
              <FaInstagram className="w-5 h-5 fill-current" />
            </button>
          </li>
          <li>
            <button className="flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out">
              <FaLinkedin className="w-5 h-5 fill-current" />
            </button>
          </li>
          <li>
            <button className="flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out">
              <FaXTwitter className="w-5 h-5 fill-current" />
            </button>
          </li>
        </ul>
        <p className="text-sm font-medium">© 2025 Artful Finds Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
