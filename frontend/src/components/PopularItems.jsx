import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import LeftArrow from "../assets/icons/leftarrow2.svg";
import RightArrow from "../assets/icons/rightarrow2.svg";

const PopularItems = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  const popularItems = [
    {
      name: "Flowers Hoodie",
      rating: 4.8,
      review: 100,
    },
    {
      name: "Forest Beaded Earrings",
      rating: 4.9,
      review: 120,
    },
    {
      name: "Northern Lights Art",
      rating: 4.7,
      review: 90,
    },
    {
      name: "Ceramic Bowl",
      rating: 4.5,
      review: 80,
    },
    {
      name: "Ribbon Skirt",
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
    <div className="w-full px-65 py-10">
      <p className="text-[#93151F] text-4xl font-semibold mb-4">
        Popular Items
      </p>
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <div
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-15 h-15 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition z-10"
          onClick={() => scroll("left")}
        >
          <img src={LeftArrow} alt="Left Arrow"/>
        </div>

        <div
          className="flex overflow-x-auto gap-4 pb-2 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          ref={scrollRef}
        >
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
                imageUrl={
                  matchedProduct.ProductMedia?.[0]?.imageUrl || item.image
                }
                rating={item.rating}
                reviews={item.review}
                badge="Popular now"
              />
            );
          })}
        </div>

        {/* Right Arrow */}
        <div
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-15 h-15 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition z-10"
          onClick={() => scroll("right")}
        >
          <img src={RightArrow} alt="Right Arrow"/>
        </div>
      </div>
    </div>
  );
};

export default PopularItems;
