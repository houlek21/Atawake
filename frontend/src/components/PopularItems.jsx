import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import "../css/PopularItems.css";
import LeftArrow from "../assets/icons/leftarrow2.svg";
import RightArrow from "../assets/icons/rightarrow2.svg";

const PopularItems = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  const popularItems = [
    {
      name: "Flowers Hoodie",
      image: "/Products/FlowersHoodie.png",
      rating: 4.8,
      review: 100,
    },
    {
      name: "Forest Beaded Earrings",
      image: "/Products/ForestBeadedEarrings.png",
      rating: 4.9,
      review: 120,
    },
    {
      name: "Northern Lights Art",
      image: "/Products/NorthernLights.png",
      rating: 4.7,
      review: 90,
    },
    {
      name: "Ceramic Bowl",
      image: "/Products/CeramicBowl.png",
      rating: 4.5,
      review: 80,
    },
    {
      name: "Ribbon Skirt",
      image: "/Products/RibbonSkirt.png",
      rating: 4.6,
      review: 95,
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="popular-items-section">
      <h2 className="popular-title">Popular Items</h2>
      <div className="scroll-wrapper">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          <img src={LeftArrow} alt="Left Arrow" />
        </button>
        <div className="product-scroll" ref={scrollRef}>
          {popularItems.map((item) => {
            const matchedProduct = products.find((p) => p.name === item.name);
            if (!matchedProduct) return null;

            return (
              <ProductCard
                key={matchedProduct.id}
                id={matchedProduct.id}
                name={matchedProduct.name}
                seller={matchedProduct.Seller?.business_name}
                price={`CA$${parseFloat(matchedProduct.price).toFixed(2)}`}
                image_url={item.image}
                rating={item.rating}
                reviews={item.review}
                badge="Popular now"
              />
            );
          })}
        </div>
        <button className="scroll-btn right" onClick={() => scroll("right")}>
          <img src={RightArrow} alt="Right Arrow" />
        </button>
      </div>
    </section>
  );
};

export default PopularItems;
