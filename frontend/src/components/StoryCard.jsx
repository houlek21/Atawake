const StoryCard = ({ image, avatar, title, author, readTime }) => {
  const redBackground = "#93151F";

  return (
    <div className="rounded-2xl overflow-hidden shadow-md w-100 bg-white">
      <div className="h-100 w-full relative">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div
        className="text-[#FAF5EE] px-4 pt-10 pb-5"
        style={{ backgroundColor: redBackground }}
      >
        <div className="text-[19px] font-normal leading-[28px] font-[Inter]">
          {title}
        </div>
        <div className="mt-1 text-[17px] font-semibold leading-[27px] font-[Inter]">
          {author}
        </div>
        <div className="inline-block px-4 py-1 mt-4 rounded-full border border-[#FAF5EE] text-[15px] font-medium text-[#FAF5EE] font-[Inter]">
          {readTime} read
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
