import { Link } from "react-router-dom";

const PodcastsCard = ({ id, title, displayImage }) => {
  return (
    <Link to={`/podcasts/${id}`}>
      <div className="w-64 min-h-64 bg-gradient-to-br from-[rgba(58,129,191,0.3)] to-[rgba(65,48,90,0.009)] rounded-2xl p-2 opacity-85 transition-all duration-300 hover:opacity-100">
        <img className="w-full h-56 rounded-t-xl  " src={displayImage} alt={title} />
        <p className="text-white text-left mt-2">{title}</p>
      </div>
    </Link>
  );
};

export default PodcastsCard;
