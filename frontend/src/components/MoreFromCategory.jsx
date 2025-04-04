import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import LeftArrow from "../assets/icons/leftarrow2.svg";
import RightArrow from "../assets/icons/rightarrow2.svg";

const MoreFromCategory = ({ categoryId, categoryName, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        const filtered = data.filter(
          (product) =>
            product.category_id === categoryId &&
            product.id !== currentProductId &&
            product.is_active
        );

        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };

    if (categoryId) fetchProducts();
  }, [categoryId, currentProductId]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  if (!products.length) return null;

  return (
    <div className="w-[1400px] h-[500px] mx-auto relative mb-10 mt-10">
      <p className="text-[#93151F] text-4xl font-semibold mb-4">
        More in {categoryName}
      </p>

      <div className="relative flex items-center">
        {/* Left Arrow */}
        <div
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition z-10"
          onClick={() => scroll("left")}
        >
          <img src={LeftArrow} alt="Left Arrow" className="w-15 h-15" />
        </div>

        {/* Product Cards */}
        <div
          className="flex overflow-x-auto gap-4 pb-2 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          ref={scrollRef}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              seller={product.Seller?.business_name}
              price={`CA$${parseFloat(product.price).toFixed(2)}`}
              imageUrl={product.ProductMedia?.[0]?.imageUrl}
              rating={4 + Math.random()}
              reviews={Math.floor(Math.random() * 2000)}
              badge={`From ${categoryName}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <div
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition z-10"
          onClick={() => scroll("right")}
        >
          <img src={RightArrow} alt="Right Arrow" className="w-15 h-15" />
        </div>
      </div>
    </div>
  );
};

export default MoreFromCategory;
