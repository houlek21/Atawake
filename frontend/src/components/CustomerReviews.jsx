import { useMemo, useState } from "react";

// Sample data
const names = [
  "Ezra Vaughn",
  "Amelia Harrington",
  "Alexander Winslow",
  "Taya S.",
  "Michael D.",
  "Emily W.",
  "Avery K.",
  "Maya P.",
];

const reviews = [
  "Super comfy! The fabric is soft, and the fit is perfect. Love it!",
  "Exactly as pictured!",
  "A bit longer than expected, but it looks amazing.",
  "Beautifully made and arrived early.",
  "Exceeded my expectations.",
  "Perfect gift, they loved it!",
  "So soft and well-crafted.",
  "Wonderful seller and fast shipping.",
];

const sizes = ["XS", "S", "M", "L"];
const productName = "Full tiered ribbon skirt";

const CustomerReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;

  // Generate a pool of 12 random but unique reviews
  const allReviews = useMemo(() => {
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
    const uniqueCombos = Array.from({ length: 12 }).map((_, i) => ({
      name: shuffle(names)[0],
      review: shuffle(reviews)[0],
      rating: Math.floor(Math.random() * 2) + 4,
      size: shuffle(sizes)[0],
      date: randomDate(),
    }));
    return uniqueCombos;
  }, []);

  // Paginated data
  const paginated = allReviews.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const totalPages = Math.ceil(allReviews.length / perPage);

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {paginated.map((item, idx) => (
          <div key={idx} className="pb-6 border-b border-gray-300">
            <div className="flex justify-between items-center mb-1">
              <p className="font-semibold text-[#3c2e24]">{item.name}</p>
              <p className="text-xs text-[#3c2e24]">{item.date}</p>
            </div>
            <div className="text-[#981b1e] text-sm mb-1">
              {"★".repeat(item.rating)}
              {"☆".repeat(5 - item.rating)}
            </div>
            <p className="text-sm text-[#3c2e24] mb-1">{item.review}</p>
            <p className="text-sm text-[#3c2e24]">
              <span className="font-semibold">Purchased item:</span>{" "}
              {productName}, Size {item.size}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center gap-2 items-center">
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
            className={`rounded-full w-8 h-8 border border-[#981b1e] text-sm ${
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
    </div>
  );
};

// Random date generator
function randomDate() {
  const start = new Date(2025, 2, 1);
  const end = new Date(2025, 2, 10);
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default CustomerReviews;
