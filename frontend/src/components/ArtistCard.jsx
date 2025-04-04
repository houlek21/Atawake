import { Link } from "react-router-dom";

const ArtistCard = ({
  seller_id,
  name,
  image_url = "path/to/default.jpg",
  location = "Location unknown",
}) => {
  return (
    <Link
      to={`/artist/${seller_id}`}
      className="inline-block text-inherit no-underline"
    >
      <div className="w-xs h-130 p-2 text-center font-sans rounded-2xl overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer">
        <img
          src={image_url}
          alt={name}
          className="w-full h-4/5 object-fill rounded-xl transition-opacity duration-300 ease-in-out hover:opacity-95"
        />
        <div className="mt-4">
          <h2 className="text-black text-3xl font-bold text-left">{name}</h2>
          <p className="mt-2 text-black text-xl text-left">{location}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;