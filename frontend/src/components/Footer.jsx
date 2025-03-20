import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMediaButton = ({ icon }) => {
  return (
    <li>
      <button
        className="p-2 flex justify-center items-center rounded-full cursor-pointer border border-white dark:border-slate-950 
          hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-100 dark:active:bg-slate-700 active:border-slate-200 dark:active:border-slate-950 active:inset-shadow-sm transition-all duration-300 ease-in-out"
      >
        {icon}
      </button>
    </li>
  );
};

const Footer = () => {
  const socialMediaIcons = [
    <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />,
    <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />,
    <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />,
    <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />,
  ];

  return (
    <footer
      data-testid="page-footer"
      className="px-4 md:px-6 xl:px-8 py-3 w-full flex justify-center items-center bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
    >
      <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2">
        <ul className="flex gap-4">
          {socialMediaIcons.map((icon, index) => (
            <SocialMediaButton key={index} icon={icon} />
          ))}
        </ul>
        <p
          data-testid="footer-text"
          className="text-sm sm:text-base font-medium"
        >
          © 2025 Artful Finds Inc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
