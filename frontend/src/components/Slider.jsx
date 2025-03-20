import { useState } from "react";
import "../css/Slider.css";
import RedButton from "./RedButton";

const Slider = () => {
  const slides = [
    {
      image: "/Slider/img1.jpg",
      title: "MADE WITH HEART",
      subtitle: "Explore handcrafted goods made by Indigenous artisans",
      buttonText: "Shop Handmade Items",
    },
    {
      image: "/Slider/img2.jpg",
      title: "MEET THE ARTISTS",
      subtitle:
        "From beadwork to pottery, every piece tells a story. Support Indigenous artists and bring cultural artistry into your life",
      buttonText: "Meet the Artists",
    },
    {
      image: "/Slider/img3.jpg",
      title: "Looking for Something Unique?",
      subtitle:
        "Work directly with Indigenous artisans to create custom, one-of-a-kind pieces made just for you",
      buttonText: "Browse Custom Goods",
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
        <RedButton text={slides[currentIndex].buttonText} />
      </div>

      <button className="prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="next" onClick={nextSlide}>
        ❯
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
