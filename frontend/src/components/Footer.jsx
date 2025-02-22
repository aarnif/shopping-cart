import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMediaButton = ({ icon }) => {
  return (
    <li>
      <button
        className="p-2 flex justify-center items-center rounded-full cursor-pointer border border-white 
      hover:bg-slate-100 active:bg-slate-100 active:border-slate-200 active:inset-shadow-sm transition-all duration-300 ease-in-out"
      >
        {icon}
      </button>
    </li>
  );
};

const Footer = () => {
  const socialMediaIcons = [
    <FaFacebook className="w-5 h-5 fill-current" />,
    <FaInstagram className="w-5 h-5 fill-current" />,
    <FaLinkedin className="w-5 h-5 fill-current" />,
    <FaXTwitter className="w-5 h-5 fill-current" />,
  ];

  return (
    <footer className="p-2 sm:p-4 w-full flex justify-center items-center bg-white text-slate-900">
      <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
        <ul className="flex gap-4">
          {socialMediaIcons.map((icon, index) => (
            <SocialMediaButton key={index} icon={icon} />
          ))}
        </ul>
        <p className="text-sm font-medium">© 2025 Artful Finds Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
