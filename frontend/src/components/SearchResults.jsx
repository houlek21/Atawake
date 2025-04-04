import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const location = useLocation();

  const query =
    new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(query)
    );
    setFiltered(results);
  }, [query, products]);

  const grouped = filtered.reduce((acc, product) => {
    const category = product.Category?.category_name || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="w-full min-h-screen px-6 md:px-12 lg:px-32 py-12">
      <div className="mb-8">
        <p className="text-[#93151F] font-inter text-[38px] font-semibold">
          {query.charAt(0).toUpperCase() + query.slice(1)}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div>
          <p className="text-gray-600 text-xl font-medium">
            No products found.
          </p>
        </div>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-16">
            <div className="mb-8">
              <p className="text-2xl font-semibold text-gray-800">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  seller={product.Seller?.business_name}
                  price={`CA$${parseFloat(product.price).toFixed(2)}`}
                  imageUrl={
                    product.ProductMedia?.[0]?.imageUrl ||
                    "/Products/default.jpg"
                  }
                  rating={4.8}
                  reviews={100}
                  badge=""
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
