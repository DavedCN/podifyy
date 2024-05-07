import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="flex justify-center pt-6">
      <div className="gradient absolute w-800 h-150 m-auto bg-blue -z-1 -top-30 filter blur-lg"></div>

      <div className="flex justify-center gap-5 text-purple-grey font-semibold text-sm  ">
        <Link
          className={`hover:text-white transition duration-300 ${
            location.pathname === "/" ? "text-white" : "text-purple-grey"
          } `}
          to="/"
        >
          Signup
        </Link>
        <Link
          className={`hover:text-white transition duration-300 ${
            location.pathname === "/podcasts"
              ? "text-white"
              : "text-purple-grey"
          } `}
          to="/podcasts"
        >
          Podcasts
        </Link>
        <Link
          className={`hover:text-white transition duration-300 ${
            location.pathname === "/createpodcast"
              ? "text-white"
              : "text-purple-grey"
          } `}
          to="/createpodcast"
        >
          Start A Podcast
        </Link>
        <Link
          className={`hover:text-white transition duration-300 ${
            location.pathname === "/profile" ? "text-white" : "text-purple-grey"
          } `}
          to="/profile"
        >
          Profile
        </Link>
      </div>
    </header>
  );
};

export default Header;
