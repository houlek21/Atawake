import { Link } from "react-router-dom";
import "../css/ArtistCard.css";

const ArtistCard = ({ seller_id, name, image_url, location }) => {
  return (
    <Link to={`/artist/${seller_id}`} className="artist-card-link">
      <div className="artist-card">
        <img
          src={image_url || "path/to/default.jpg"} // fallback image
          alt={name}
          className="artist-image"
        />
        <div className="artist-info">
          <h2 className="artist-name">{name}</h2>
          <p className="artist-location">{location || "Location unknown"}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;
