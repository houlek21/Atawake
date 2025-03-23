import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import "../css/PopularItems.css";
import { formatURL } from '../formatURL';

const PopularItems = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const products = [
    {
      name: "Flowers Hoodie",
      seller: "Taya Sky",
      price: "CA$45.00",
      image: "Products/FlowersHoodie.png",
      rating: 4.7,
      reviews: 90,
      badge: "Popular now",
    },
    {
      name: "Forest Beaded Earrings",
      seller: "Taya Sky",
      price: "CA$37.00",
      image: "Products/ForestBeadedEarrings.png",
      rating: 5.0,
      reviews: 2100,
      badge: "Popular now",
    },
    {
      name: "Northern Lights Art",
      seller: "Nova Waskah",
      price: "CA$10.00",
      image: "Products/NorthernLights.png",
      rating: 4.2,
      reviews: 50,
      badge: "Popular now",
    },
    {
      name: "Ceramic Bowl",
      seller: "Maya Crowfoot",
      price: "CA$34.00",
      image: "Products/CeramicBowl.png",
      rating: 4.8,
      reviews: 85,
      badge: "Popular now",
    },
    {
      name: "Ribbon Skirt",
      seller: "Nova Waskah",
      price: "CA$210.00",
      image: "Products/RibbonSkirt.png",
      rating: 4.9,
      reviews: 1100,
      badge: "Popular now",
    },
  ];

  return (
    <section className="popular-items-section">
      <h2 className="popular-title">Popular Items</h2>
      <div className="scroll-wrapper">
        <button className="scroll-btn left" onClick={() => scroll("left")}>‹</button>
        <div className="product-scroll" ref={scrollRef}>
          {products.map((product, index) => {
            const sellerURL = formatURL(product.seller);
            const productURL = formatURL(product.name);
            const link = `/artist/${sellerURL}/product/${productURL}`;

            return (
              <ProductCard
                key={index}
                name={product.name}
                seller={product.seller}
                price={product.price}
                image={product.image}
                rating={product.rating}
                reviews={product.reviews}
                link={link}
                badge={product.badge}
              />
            );
          })}
        </div>
        <button className="scroll-btn right" onClick={() => scroll("right")}>›</button>
      </div>
    </section>
  );
};

export default PopularItems;
