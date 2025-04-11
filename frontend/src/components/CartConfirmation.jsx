import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added

const CartConfirmation = ({ isOpen, onClose, items, subtotal }) => {
  const navigate = useNavigate(); // ✅ hook for navigation

  const handleCheckout = () => {
    navigate("/cart", {
      state: {
        cartItems: items,
        subtotal: subtotal,
      },
    });
  };

  // Update quantity in cart
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          product_id: productId, 
          quantity: newQuantity 
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
      
      // Refresh the cart automatically by redirecting to the same page
      window.location.reload();
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-40 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-[#392516] text-white shadow-lg z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-[#5d3f2d]">
          <h2 className="text-sm font-semibold">Subtotal:</h2>
          <p className="text-sm font-bold">CA${typeof subtotal === 'number' ? subtotal.toFixed(2) : '0.00'}</p>
        </div>

        {/* Items */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
          {items && items.length > 0 ? (
            items.map((item) => (
              <div key={item.product_id} className="flex items-center gap-3">
                <img
                  src={item.image_url}
                  alt={item.product_name}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://media.istockphoto.com/id/1186111736/vector/question-mark-and-exclamation-point-blue-signs-on-yellow-comic-banner-in-pop-art-style-vector.jpg?s=612x612&w=0&k=20&c=4UUN2cDXwzqf5XuI_-mzhhwTgmoCppZxA3MpzMjvajI=";
                  }}
                />
                <div>
                  <p className="text-sm font-medium">{item.product_name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button 
                      className="text-lg px-2 rounded hover:bg-[#4d3527]"
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button 
                      className="text-lg px-2 rounded hover:bg-[#4d3527]"
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm">Your cart is empty</p>
          )}
        </div>

        {/* Checkout Button */}
        <div className="p-4">
          <button
            onClick={handleCheckout}
            className="w-full bg-[#3c2e24] text-white rounded-full py-2 text-sm font-medium hover:bg-[#2e221a] transition"
          >
            Cart →
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-2xl font-light hover:text-gray-300"
        >
          &times;
        </button>
      </div>
    </>
  );
};

export default CartConfirmation;