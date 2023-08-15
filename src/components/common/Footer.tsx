import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";

const Footer = (): JSX.Element => {
  return (
    <footer className="w-full bg-black-primary flex flex-row items-center justify-center h-24">
      <Link
        to="https://github.com/winnow-2023?tab=repositories"
        target="_blank"
        className="text-white mr-2 text-2xl"
      >
        <AiFillGithub />
      </Link>
      <p className="text-white text-xs font-light">
        Copyright © 2023 Best-Choice All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
