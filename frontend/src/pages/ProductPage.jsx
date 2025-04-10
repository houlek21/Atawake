import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WhatCustomersSay from "../components/WhatCustomersSay";
import CustomerReviews from "../components/CustomerReviews";
import MoreFromSeller from "../components/MoreFromSeller";
import MoreFromCategory from "../components/MoreFromCategory";
import CartConfirmation from "../components/CartConfirmation";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [cartOpen, setCartOpen] = useState(false); // for drawer
  const [cartItems, setCartItems] = useState([]); // cart contents
  const [cartSubtotal, setCartSubtotal] = useState(0);

  // Add this function to fetch cart data
  const fetchCartData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems);
        setCartSubtotal(parseFloat(data.subtotal));
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

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
          `http://localhost:5000/api/seller/${product.seller_id}`
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

  // Fetch cart when drawer opens
  useEffect(() => {
    if (cartOpen) {
      fetchCartData();
    }
  }, [cartOpen]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      // Make API call to the backend
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: product.id, 
          quantity: 1
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding to cart:", errorData.message);
        return;
      }
      
      // After successful API call, get the updated cart
      await fetchCartData();
      setCartOpen(true);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  if (!product) {
    return <p className="text-center mt-20">Loading product...</p>;
  }

  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-32 py-12">
      <h1 className="text-black font-inter text-[38px] font-semibold mb-8">
        {product.name}
      </h1>

      <div className="flex flex-col lg:flex-row gap-80 items-start">
        {/* Left: Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product.ProductMedia?.map((media, idx) => (
              <img
                key={idx}
                src={media.imageUrl}
                alt={`thumb-${idx}`}
                className="w-50 h-50 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-[550px] h-[550px] rounded-xl shadow-md overflow-hidden">
            <img
              src={product.ProductMedia?.[0]?.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Info Panel */}
        <div className="p-4 space-y-4 w-full max-w-sm">
          <p className="text-xl text-red-700 font-semibold">
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
                  src={seller.profileImageUrl}
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

          <div className="space-y-5 pt-4">
            <div>
              <label
                htmlFor="size"
                className="block text-lg font-base text-black"
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
                className="block text-lg font-base text-black"
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
              className="w-full bg-[#981b1e] text-white text-lg font-medium mt-4 px-6 py-3 rounded-full hover:bg-[#7d161a] transition"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-10 md:flex-row gap-120 w-full justify-start">
        {/* Number of Reviews */}
        <div className="p-6 rounded-lg space-y-4 w-140">
          <div className="flex items-center gap-4">
            <p className="text-4xl font-bold text-[#981b1e]">1,2654 reviews</p>
            <p className="text-3xl text-[#981b1e]">★ ★ ★ ★ ☆</p>
          </div>

          {[5, 4, 3, 2, 1].map((star) => {
            const percentage = { 5: 90, 4: 10, 3: 0, 2: 0, 1: 0 }[star];
            return (
              <div
                key={star}
                className="flex items-center gap-3 text-[#392516]"
              >
                <div className="w-14">
                  <p>{star} star</p>
                </div>
                <div className="flex-1 h-4 bg-white border border-gray-300 rounded">
                  <div
                    className="h-full bg-[#3c2e24] rounded"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="w-10 text-right">
                  <p>{percentage}%</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Product + Delivery Box */}
        <div className="p-6 rounded-lg space-y-4 text-[#3c2e24] w-full max-w-md">
          <div className="flex justify-between items-center font-semibold text-[#981b1e] text-4xl cursor-pointer">
            <p>Product details</p>
            <p>›</p>
          </div>

          <div className="space-y-4 text-xl">
            <div className="flex justify-between items-center font-semibold text-[#981b1e] text-4xl cursor-pointer">
              <p>Delivery details</p>
              <p>⌄</p>
            </div>

            <div>
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
        currentProductId={product.id}
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
        subtotal={cartSubtotal}
      />
    </div>
  );
};

export default ProductPage;