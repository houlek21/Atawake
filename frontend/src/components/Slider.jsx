import { useState } from "react";
import "../css/Slider.css";
import LeftArrow from "../assets/icons/leftarrow1.svg";
import RightArrow from "../assets/icons/rightarrow1.svg";

const Slider = () => {
  const slides = [
    {
      image: "/Slider/img1.jpg",
      title: "MADE WITH HEART",
      subtitle: "Explore handcrafted goods made by Indigenous artisans",
      buttonText: "Shop Handmade Items",
      buttonLink: "/shop",
    },
    {
      image: "/Slider/img2.jpg",
      title: "MEET THE ARTISTS",
      subtitle:
        "From beadwork to pottery, every piece tells a story. Support Indigenous artists and bring cultural artistry into your life",
      buttonText: "Meet the Artists",
      buttonLink: "/artists",
    },
    {
      image: "/Slider/img3.jpg",
      title: "Looking for Something Unique?",
      subtitle:
        "Work directly with Indigenous artisans to create custom, one-of-a-kind pieces made just for you",
      buttonText: "Browse Custom Goods",
      buttonLink: "/custom",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          alt={slide.title}
          className={`slide-image ${index === currentIndex ? "active" : ""}`}
        />
      ))}

      <div className="dark-overlay"></div>

      <div className="slide-overlay">
        <h1 className="title">{slides[currentIndex].title}</h1>
        <p className="subtitle">{slides[currentIndex].subtitle}</p>

        <a
          href={slides[currentIndex].buttonLink}
          className="inline-block text-white px-6 py-3 rounded-full text-sm transition"
          style={{ backgroundColor: "#93151F" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#701016")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#93151F")}
        >
          {slides[currentIndex].buttonText}
        </a>
      </div>

      <button className="prev" onClick={prevSlide} aria-label="Previous Slide">
        <img src={LeftArrow} alt="Previous slide" />
      </button>
      <button className="next" onClick={nextSlide} aria-label="Next Slide">
        <img src={RightArrow} alt="Next slide" />
      </button>

      <div className="dots-container">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;