import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import LeftArrow from "../assets/icons/leftarrow2.svg";
import RightArrow from "../assets/icons/rightarrow2.svg";

const MoreFromSeller = ({ sellerId, sellerName }) => {
  const [sellerProducts, setSellerProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products?seller_id=${sellerId}`);
        const data = await res.json();
        setSellerProducts(data);
      } catch (err) {
        console.error("Error fetching seller's products:", err);
      }
    };

    if (sellerId) fetchProducts();
  }, [sellerId]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!sellerProducts.length) return null;

  return (
    <div className="w-full px-8 py-10">
      <p className="text-[#93151F] text-4xl font-semibold mb-4">
        More from {sellerName}
      </p>
      <div className="relative flex items-center">
        <button
          className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 hover:scale-105 transition"
          onClick={() => scroll("left")}
        >
          <img src={LeftArrow} alt="Left Arrow" className="w-5 h-5" />
        </button>

        <div
          className="flex flex-row overflow-x-auto gap-4 pb-2 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          ref={scrollRef}
        >
          {sellerProducts.map((product) => (
            <div key={product.id} className="snap-start flex-shrink-0">
              <ProductCard
                id={product.id}
                name={product.name}
                seller={product.Seller?.business_name}
                price={`CA$${parseFloat(product.price).toFixed(2)}`}
                image_url={product.ProductMedia?.[0]?.media_url}
                rating={4 + Math.random()} // Replace with actual backend data
                reviews={Math.floor(Math.random() * 2000)} // Replace with actual backend data
                badge={`From ${sellerName}`}
              />
            </div>
          ))}
        </div>

        <button
          className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 hover:scale-105 transition"
          onClick={() => scroll("right")}
        >
          <img src={RightArrow} alt="Right Arrow" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MoreFromSeller;
