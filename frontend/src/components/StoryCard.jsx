import React from "react";

const StoryCard = ({ image, avatar, title, author, readTime }) => {
  const redBackground = "#93151F";

  return (
    <a
      href="/your-target-page"
      className="block rounded-2xl overflow-hidden shadow-md w-[300px] bg-white"
    >
      <div className="h-[300px] w-full relative">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
          <img
            src={avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
      <div
        className="text-white px-4 pt-8 pb-4"
        style={{ backgroundColor: redBackground }}
      >
        <h3
          className="text-[17px] font-normal leading-[27px]"
          style={{ color: "var(--Color, #FAF5EE)", fontFamily: "Inter" }}
        >
          {title}
        </h3>
        <p
          className="mt-1"
          style={{
            color: "var(--Color, #FAF5EE)",
            fontFamily: "Inter",
            fontSize: "15px",
            fontWeight: 600,
            lineHeight: "27px",
          }}
        >
          {author}
        </p>
        <p
          className="inline-block px-3 py-1 mt-4 rounded-full border"
          style={{
            backgroundColor: redBackground,
            borderColor: "#FAF5EE",
            borderWidth: "1px",
            color: "#FAF5EE",
            fontFamily: "Inter",
            fontSize: "13px",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {readTime} read
        </p>
      </div>
    </a>
  );
};

export default StoryCard;
