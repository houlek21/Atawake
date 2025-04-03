import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WhatCustomersSay from "../components/WhatCustomersSay";
import CustomerReviews from "../components/CustomerReviews";
import MoreFromSeller from "../components/MoreFromSeller";
import MoreFromCategory from "../components/MoreFromCategory";
import CartConfirmation from "../components/CartConfirmation"; // ✅ ADD

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [cartOpen, setCartOpen] = useState(false); // ✅ for drawer
  const [cartItems, setCartItems] = useState([]); // ✅ cart contents

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch seller
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/sellers/${product.seller_id}`
        );
        const data = await res.json();
        setSeller(data);
      } catch (err) {
        console.error("Error fetching seller info:", err);
      }
    };

    if (product?.seller_id) {
      fetchSeller();
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;

    const newItem = {
      name: product.name,
      image: product.ProductMedia?.[0]?.media_url,
      quantity: 1,
      price: parseFloat(product.price),
    };

    setCartItems([newItem]);
    setCartOpen(true);
  };

  if (!product) {
    return <p className="text-center mt-20">Loading product...</p>;
  }

  return (
    <div className="bg-[#f9f0e7] min-h-screen px-6 md:px-12 lg:px-32 py-12">
      <h1 className="text-black font-inter text-[38px] font-semibold mb-8">
        {product.name}
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left: Image Gallery */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3 w-20">
            {product.ProductMedia?.map((media, idx) => (
              <img
                key={idx}
                src={media.media_url}
                alt={`thumb-${idx}`}
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>

          <div className="w-full max-w-xl max-h-[500px] overflow-hidden rounded-xl shadow-md">
            <img
              src={product.ProductMedia?.[0]?.media_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Info Panel */}
        <div className="p-4 space-y-4 w-full max-w-sm">
          <p className="text-sm text-red-700 font-semibold">
            Only {product.quantity} left and in 4 baskets
          </p>

          <p className="text-black font-inter text-[27px] font-medium">
            CA${parseFloat(product.price).toFixed(2)}
          </p>

          <p className="text-black font-inter text-[17px] font-normal">
            {product.description}
          </p>

          {seller && (
            <div className="flex flex-col items-start space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={
                    seller.User?.profile_image_url || "/placeholder-avatar.jpg"
                  }
                  alt={seller.business_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-black">
                    {seller.business_name}
                  </p>
                  <p className="text-xs text-black">★★★★★</p>
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-1 rounded-full text-white text-sm bg-[#3c2e24] hover:bg-[#2d241c] transition">
                <span className="text-lg">♡</span> {seller.business_name}
              </button>
            </div>
          )}

          <div className="space-y-4 pt-4">
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-black"
              >
                Size<span className="text-red-600">*</span>
              </label>
              <select
                id="size"
                name="size"
                required
                className="mt-1 block w-full rounded-full border border-gray-500 bg-[#e7dfd5] text-gray-700 px-4 py-2 appearance-none focus:outline-none"
              >
                <option value="">Select an option</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="personalization"
                className="block text-sm font-medium text-black"
              >
                Add your personalization (optional)
              </label>
              <div className="relative">
                <textarea
                  id="personalization"
                  name="personalization"
                  maxLength={200}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-500 bg-[#e7dfd5] text-black px-3 py-2 resize-none focus:outline-none"
                ></textarea>
                <span className="absolute bottom-1 right-2 text-xs text-gray-500">
                  0/200
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-[#981b1e] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#7d161a] transition"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews & Details */}
      <div className="flex flex-col md:flex-row gap-6 bg-[#f9f0e7] p-6 rounded-lg max-w-4xl w-full">
        <div className="p-4 rounded-lg w-full max-w-xs space-y-3 text-sm">
          <h2 className="text-xl font-bold text-[#981b1e]">
            1,2654 reviews{" "}
            <span className="text-lg text-[#981b1e]">★ ★ ★ ★ ☆</span>
          </h2>

          {[5, 4, 3, 2, 1].map((star) => {
            const percentage = { 5: 90, 4: 10, 3: 0, 2: 0, 1: 0 }[star];
            return (
              <div
                key={star}
                className="flex items-center gap-2 text-[#392516]"
              >
                <span className="w-12">{star} star</span>
                <div className="flex-1 h-3 bg-white border border-gray-300 rounded">
                  <div
                    className="h-full bg-[#3c2e24] rounded"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="w-10 text-right">{percentage}%</span>
              </div>
            );
          })}
        </div>

        <div className="bg-[#f9f0e7] p-4 rounded-md text-sm text-[#3c2e24] space-y-4 w-full max-w-xs">
          <div className="flex justify-between items-center font-semibold text-[#981b1e] cursor-pointer">
            <span>Product details</span>
            <span>›</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center font-semibold text-[#981b1e] cursor-pointer">
              <span>Delivery details</span>
              <span>⌄</span>
            </div>
            <div className="text-[#3c2e24] mt-1">
              <p>
                Order today to get by{" "}
                <span className="font-semibold">19–23 March</span>
              </p>
              <p>
                <span className="underline">Returns & exchanges</span> accepted
                <br />
                within <span className="font-semibold">30 days</span>
              </p>
              <p className="font-semibold mt-2">Free delivery</p>
            </div>
          </div>
        </div>
      </div>
      <WhatCustomersSay />
      <CustomerReviews />
      <MoreFromSeller
        sellerId={product.seller_id}
        sellerName={product.Seller?.business_name}
      />
      <MoreFromCategory
        categoryId={product.category_id}
        categoryName={product.Category?.category_name}
        currentProductId={product.id}
      />
      <CartConfirmation
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        subtotal={cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)}
      />
    </div>
  );
};

export default ProductPage;
