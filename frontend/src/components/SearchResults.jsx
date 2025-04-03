import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../css/SearchResults.css";

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
    <div className="search-results-page">
      <h1>Search Results for "{query}"</h1>
      {filtered.length === 0 ? (
        <p className="no-results">No products found</p>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <div className="product-grid">
              {items.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  seller={product.Seller?.business_name}
                  price={`CA$${parseFloat(product.price).toFixed(2)}`}
                  image_url={`${
                    product.ProductMedia[0]?.media_url || "Products/default.jpg"
                  }`}
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
