import StoryCard from "../components/StoryCard";

const cardData = [
  {
    image: "/FromArtists/Beading.png",
    avatar: "/LocalArtists/Taya.jpg",
    title: "The Story Behind the Beads: Honoring Craftsmanship",
    author: "Taya Sky",
    readTime: "5 min",
  },
  {
    image: "/FromArtists/LeatherShoes.png",
    avatar: "/LocalArtists/Nova.jpg",
    title: "Custom Moccasins: Every Step Holds a Story",
    author: "Nova Waskah",
    readTime: "2 min",
  },
  {
    image: "/FromArtists/Pottery.png",
    avatar: "/LocalArtists/Maya.jpg",
    title: "More Than Art: The Meaning Behind Indigenous Pottery",
    author: "Maya Crowfoot",
    readTime: "5 min",
  },
];

const ArtistStories = () => {
  return (
    <div className="bg-[#FFF8F1] py-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto">
        <h2
          className="mb-6 flex items-center gap-2"
          style={{
            color: "var(--red, #93151F)",
            fontFamily: "Inter",
            fontSize: "38px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
          }}
        >
          From Our Artists <span style={{ fontSize: "38px" }}>→</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          {cardData.map((card, index) => (
            <StoryCard
              key={index}
              image={card.image}
              avatar={card.avatar}
              title={card.title}
              author={card.author}
              readTime={card.readTime}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistStories;
