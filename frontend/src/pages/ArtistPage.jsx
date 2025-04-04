import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/ArtistPage.css"; // Ensure this is imported for styling

const ArtistPage = () => {
  const { seller } = useParams(); // seller = seller_id
  const [sellerInfo, setSellerInfo] = useState(null);

  // Same profile map from LocalArtists.jsx
  const artistProfiles = {
    "Taya Sky Creations": {
      image: "/LocalArtists/Taya.jpg",
      location: "Sherwood Park, AB",
    },
    "Nova Waskah Creations": {
      image: "/LocalArtists/Nova.jpg",
      location: "Edmonton, AB",
    },
    "Maya Crowfoot Creations": {
      image: "/LocalArtists/Maya.jpg",
      location: "Sherwood Park, AB",
    },
  };

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/seller/${seller}`);
        if (!res.ok) throw new Error("Failed to fetch seller");
        const data = await res.json();
        setSellerInfo(data);
      } catch (err) {
        console.error("Error fetching seller:", err);
      }
    };

    fetchSeller();
  }, [seller]);

  if (!sellerInfo) return <p>Loading artist info...</p>;

  const profile = artistProfiles[sellerInfo.business_name] || {};

  return (
    <div className="artist-page">
      <img
        src={profile.image}
        alt="No image"
        className="artist-profile-image"
      />
      <h1 className="artist-page-name">{sellerInfo.business_name}</h1>
      <p className="artist-page-location">{profile.location}</p>
      <p className="artist-page-bio">{sellerInfo.about_us_description}</p>
    </div>
  );
};

export default ArtistPage;