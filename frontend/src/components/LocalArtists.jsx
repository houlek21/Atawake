import React, { useEffect, useState } from "react";
import "../css/LocalArtists.css";
import ArtistCard from "./ArtistCard";

const LocalArtists = () => {
  const [sellers, setSellers] = useState([]);

  // Map business names to images + locations
  const artistProfiles = {
    "Taya Sky Creations": {
      name: "Taya Sky",
      image: "/LocalArtists/Taya.jpg",
      location: "Sherwood Park, AB",
    },
    "Nova Waskah Creations": {
      name: "Nova Waskah",
      image: "/LocalArtists/Nova.jpg",
      location: "Edmonton, AB",
    },
    "Maya Crowfoot Creations": {
      name: "Maya Crowfoot",
      image: "/LocalArtists/Maya.jpg",
      location: "Sherwood Park, AB",
    },
  };

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/sellers");
        const data = await res.json();
        setSellers(data);
      } catch (err) {
        console.error("Error fetching sellers:", err);
      }
    };

    fetchSellers();
  }, []);

  return (
    <section className="artists-section">
      <div className="artists-header">
        <h2 className="artists-title">
          Explore
          <br />
          local artists
        </h2>
        <a href="/artists" className="view-all-button">
          View all
        </a>
      </div>
      <div className="artists-grid">
        {sellers.map((seller) => {
          const profile = artistProfiles[seller.business_name] || {};
          return (
            <ArtistCard
              key={seller.id}
              seller_id={seller.id}
              name={profile.name}
              image_url={profile.image}
              location={profile.location}
            />
          );
        })}
      </div>
    </section>
  );
};

export default LocalArtists;
