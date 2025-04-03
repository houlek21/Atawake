import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import LeftArrow from "../assets/icons/leftarrow2.svg";
import RightArrow from "../assets/icons/rightarrow2.svg";

const MoreFromCategory = ({ categoryId, categoryName, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products`);
        const data = await res.json();

        const filtered = data.filter(
          (p) =>
            p.category_id === categoryId &&
            p.id !== currentProductId && // exclude current product
            p.is_active !== false // optionally skip inactive products
        );

        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };

    if (categoryId) fetchProducts();
  }, [categoryId, currentProductId]);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    setCanScrollLeft(scrollRef.current.scrollLeft > 0);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => el.removeEventListener("scroll", updateScrollButtons);
    }
  }, [relatedProducts]);

  if (!relatedProducts.length) return null;

  return (
    <section className="popular-items-section">
      <h2 className="popular-title text-[#981b1e] mb-2">You may also like</h2>

      <div className="scroll-wrapper relative">
        {canScrollLeft && (
          <button className="scroll-btn left" onClick={() => scroll("left")}>
            <img src={LeftArrow} alt="Left Arrow" />
          </button>
        )}

        <div className="product-scroll" ref={scrollRef}>
          {relatedProducts.map((product) => (
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

export default MoreFromCategory;
