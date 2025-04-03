import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ added

const CartConfirmation = ({ isOpen, onClose, items, subtotal }) => {
  const navigate = useNavigate(); // ✅ hook for navigation

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        cartItems: items,
        subtotal: subtotal,
      },
    });
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
          <p className="text-sm font-bold">CA${subtotal.toFixed(2)}</p>
        </div>

        {/* Items */}
        <div className="p-4 space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button className="text-lg px-2 rounded hover:bg-[#4d3527]">
                    −
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button className="text-lg px-2 rounded hover:bg-[#4d3527]">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
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
