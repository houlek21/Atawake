import React from 'react';
import '../css/LocalArtists.css';
import ArtistCard from './ArtistCard';
import { formatURL } from '../formatURL';

const LocalArtists = () => {
  const artists = [
    { name: "Taya Sky", location: "Sherwood Park, AB", image: "/LocalArtists/Taya.jpg" },
    { name: "Nova Waskah", location: "Edmonton, AB", image: "/LocalArtists/Nova.jpg" },
    { name: "Maya Crowfoot", location: "Sherwood Park, AB", image: "/LocalArtists/Maya.jpg" },
  ];

  return (
    <section className="artists-section">
      <div className="artists-header">
        <h2 className="artists-title">Explore<br />local artists</h2>
        <a href="/artists" className="view-all-button">View all</a>
      </div>

      <div className="artists-grid">
        {artists.map((artist, index) => {
          const sellerURL = formatURL(artist.name);
          return (
            <ArtistCard
              key={index}
              name={artist.name}
              location={artist.location}
              image={artist.image}
              link={`/artist/${sellerURL}`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default LocalArtists;
