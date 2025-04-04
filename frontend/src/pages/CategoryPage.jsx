import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const categoryName = location.state?.categoryName || "Selected Category";
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        const filtered = data.filter(
          (p) => p.category_id === parseInt(id) && p.is_active
        );
        setProducts(filtered);
      } catch (err) {
        console.error("Error loading category products:", err);
      }
    };

    fetchProducts();
  }, [id]);

  const totalPages = Math.ceil(products.length / perPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="w-full min-h-screen px-6 md:px-12 lg:px-32 py-12">
      <div className="mb-10">
        <p className="text-[#93151F] font-inter text-[38px] font-semibold">
          {categoryName}
        </p>
        <p className="text-2xl font-semibold text-gray-800 mt-4">
          {products.length} result{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      {products.length === 0 ? (
        <div>
          <p className="text-gray-600 text-xl font-medium">
            No products found in this category.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                seller={product.Seller?.business_name}
                price={`CA$${parseFloat(product.price).toFixed(2)}`}
                imageUrl={product.ProductMedia?.[0]?.imageUrl}
                rating={4 + Math.random()}
                reviews={Math.floor(Math.random() * 500)}
                badge={`In ${categoryName}`}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2 items-center mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`rounded-full px-3 py-1 text-white ${
                currentPage === 1
                  ? "bg-[#d28d8d]"
                  : "bg-[#981b1e] hover:bg-[#7d161a]"
              }`}
            >
              ←
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`rounded-full w-12 h-12 border border-[#981b1e] text-sm ${
                  currentPage === i + 1
                    ? "bg-[#981b1e] text-white"
                    : "text-[#981b1e] hover:bg-[#f3e8e8]"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`rounded-full px-3 py-1 text-white ${
                currentPage === totalPages
                  ? "bg-[#d28d8d]"
                  : "bg-[#981b1e] hover:bg-[#7d161a]"
              }`}
            >
              →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPage;
