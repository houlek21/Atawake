import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import LeftArrow from "../assets/icons/leftarrow2.svg";
import RightArrow from "../assets/icons/rightarrow2.svg";

const MoreFromSeller = ({ sellerId, sellerName }) => {
  const [sellerProducts, setSellerProducts] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const scrollRef = useRef(null);

  // Fetch seller's products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products`);
        const data = await res.json();
        const filtered = data.filter((p) => p.seller_id === sellerId);
        setSellerProducts(filtered);
      } catch (err) {
        console.error("Error fetching seller's products:", err);
      }
    };

    if (sellerId) fetchProducts();
  }, [sellerId]);

  // Update scroll button visibility
  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    setCanScrollLeft(scrollRef.current.scrollLeft > 0);
  };

  // Scroll action
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Add scroll listener
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => el.removeEventListener("scroll", updateScrollButtons);
    }
  }, [sellerProducts]);

  if (!sellerProducts.length) return null;

  return (
    <section className="popular-items-section">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="popular-title text-[#981b1e]">More from {sellerName}</h2>
        <span className="bg-[#3c2e24] text-white text-xs px-3 py-1 rounded-full">
          {sellerName}
        </span>
      </div>

      <div className="scroll-wrapper relative">
        {canScrollLeft && (
          <button className="scroll-btn left" onClick={() => scroll("left")}>
            <img src={LeftArrow} alt="Left Arrow" />
          </button>
        )}
        <div className="product-scroll" ref={scrollRef}>
          {sellerProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              seller={product.Seller?.business_name}
              price={`CA$${parseFloat(product.price).toFixed(2)}`}
              image_url={product.ProductMedia?.[0]?.media_url}
              rating={4 + Math.random()} // TEMP
              reviews={Math.floor(Math.random() * 2000)} // TEMP
            />
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll("right")}>
          <img src={RightArrow} alt="Right Arrow" />
        </button>
      </div>
    </section>
  );
};

export default MoreFromSeller;
