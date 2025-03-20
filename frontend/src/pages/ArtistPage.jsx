import { useParams } from "react-router-dom";
import "../css/ArtistPage.css";

const ArtistPage = () => {
  const { seller } = useParams();

  const formattedName = seller.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="artist-page">
      <div className="artist-profile">
        <img src={`/LocalArtists/${seller}.jpg`} alt={formattedName} className="artist-profile-image" />
        <h1 className="artist-page-name">{formattedName}</h1>
        <p className="artist-page-location">Location: [Insert Location]</p>
        <p className="artist-page-bio">Bio coming soon...</p>
      </div>
    </div>
  );
};

export default ArtistPage;
