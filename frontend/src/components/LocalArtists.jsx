import React, { useEffect, useState } from "react";
import ArtistCard from "./ArtistCard";

import img2 from "../assets/Artist/profile1.jpg"
import img3 from "../assets/Artist/profile2.jpg"


const LocalArtists = () => {
  const [sellers, setSellers] = useState([]);

  const artistProfiles = {
    "Taya Sky Creations": {
      name: "Taya Sky",
      location: "Sherwood Park, AB",
    },
    "Nova Waskah Creations": {
      name: "Nova Waskah",
      location: "Edmonton, AB",
    },
    "Maya Crowfoot Creations": {
      name: "Maya Crowfoot",
      location: "Sherwood Park, AB",
    },
  };

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/seller");
        const data = await res.json();
        setSellers(data);
      } catch (err) {
        console.error("Error fetching sellers:", err);
      }
    };

    fetchSellers();
  }, []);

  return (
    <div className="w-full mt-25 mb-25 flex flex-wrap justify-center items-center text-left">
      <div className="w-auto h-auto mr-30">
        <p className="text-[#93151F] text-4xl font-semibold mb-4">
          Explore
          <br />
          local artists
        </p>
        <a
          href="/artists"
          className="inline-block rounded-full border px-7 py-2 text-xl font-medium no-underline text-[#7a271a] border-[#7a271a] transition-colors duration-300 hover:bg-[#7a271a] hover:text-white"
        >
          View all
        </a>
      </div>
      <div className="flex flex-wrap justify-start">
      
      <a href="/sellers"><ArtistCard
              key={""}
              seller_id={"taya"}
              name={"Taya Sky"}
              image_url={img3}
              location={"Sherwood Park, AB"}
            />
            </a>
        {sellers.map((seller) => {
          const profile = artistProfiles[seller.business_name] || {};
          return (
            <ArtistCard
              key={seller.id}
              seller_id={seller.id}
              name={profile.name}
              image_url={seller.profileImageUrl}
              location={profile.location}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LocalArtists;
