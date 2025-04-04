import { useEffect, useState } from "react";
import StoryCard from "../components/StoryCard";

const initialCards = [
  {
    image: "/FromArtists/Beading.png",
    author: "Taya Sky",
    title: "The Story Behind the Beads: Honoring Craftsmanship",
    readTime: "5 min",
  },
  {
    image: "/FromArtists/LeatherShoes.png",
    author: "Nova Waskah",
    title: "Custom Moccasins: Every Step Holds a Story",
    readTime: "2 min",
  },
  {
    image: "/FromArtists/Pottery.png",
    author: "Maya Crowfoot",
    title: "More Than Art: The Meaning Behind Indigenous Pottery",
    readTime: "5 min",
  },
];

const ArtistStories = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/seller");
        const sellers = await res.json();

        const updatedCards = initialCards.map((card) => {
          const matchedSeller = sellers.find(
            (s) =>
              s.business_name?.toLowerCase().includes(card.author.toLowerCase()) ||
              s.contact_person?.toLowerCase() === card.author.toLowerCase()
          );

          return {
            ...card,
            avatar: matchedSeller?.profileImageUrl || "/placeholder-avatar.jpg",
          };
        });

        setCardData(updatedCards);
      } catch (error) {
        console.error("Failed to fetch sellers:", error);
        setCardData(
          initialCards.map((card) => ({
            ...card,
            avatar: "/placeholder-avatar.jpg",
          }))
        );
      }
    };

    fetchSellers();
  }, []);

  return (
    <div className="py-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 px-2 sm:px-0">
          <p className="text-[38px] font-semibold text-[#93151F] font-[Inter] flex items-center gap-2 ml-[1.5%] md:ml-[1.5%]">
            From Our Artists <span>→</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="w-full sm:w-[48%] md:w-[31%] flex justify-center"
            >
              <StoryCard
                image={card.image}
                avatar={card.avatar}
                title={card.title}
                author={card.author}
                readTime={card.readTime}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistStories;
