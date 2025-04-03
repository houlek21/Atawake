import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import '../css/Cart.css';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState("0.00");
  const [isGift, setIsGift] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch cart data from backend
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/cart/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // Include authorization token if user is logged in
            ...(localStorage.getItem('token') && {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
          },
          credentials: 'include' // Important for cookies
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
        
        const data = await response.json();
        setCartItems(data.cartItems || []);
        setCartTotal(data.total || "0.00"); // Use the total from the backend
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCart();
  }, []);
  
  // Update quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem('token') && {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          })
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
      
      // After update, fetch the cart again to get new totals
      const cartResponse = await fetch('http://localhost:5000/api/cart/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(localStorage.getItem('token') && {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          })
        },
        credentials: 'include'
      });
      
      if (cartResponse.ok) {
        const cartData = await cartResponse.json();
        setCartItems(cartData.cartItems || []);
        setCartTotal(cartData.total || "0.00");
      } else {
        // If we can't fetch the updated cart, just update the local item
        setCartItems(items =>
          items.map(item => 
            item.product_id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };
  
  // Remove item
  const removeItem = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem('token') && {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          })
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove item');
      }
      
      // After deletion, fetch the cart again to get new totals
      const cartResponse = await fetch('http://localhost:5000/api/cart/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(localStorage.getItem('token') && {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          })
        },
        credentials: 'include'
      });
      
      if (cartResponse.ok) {
        const cartData = await cartResponse.json();
        setCartItems(cartData.cartItems || []);
        setCartTotal(cartData.total || "0.00");
      } else {
        // If we can't fetch the updated cart, just remove the item locally
        setCartItems(items => items.filter(item => item.product_id !== productId));
      }
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };
  
  // Proceed to checkout
  const proceedToCheckout = () => {
    // Store gift preference in localStorage or sessionStorage for checkout
    sessionStorage.setItem('orderIsGift', isGift);
    navigate('/checkout');
  };
  
  if (isLoading) {
    return (
      <div className="cart-container">
        <div className="cart-wrapper">
          <h1 className="cart-title">Your cart</h1>
          <div className="loading">Loading your cart...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="cart-container">
        <div className="cart-wrapper">
          <h1 className="cart-title">Your cart</h1>
          <div className="error">
            <p>Sorry, we couldn't load your cart. Please try again.</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-container">
      <div className="cart-wrapper">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        
        <h1 className="cart-title">Your cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="continue-shopping" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <CartItem 
                  key={item.product_id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>
            
            <div className="checkout-sidebar">
              <div className="gift-option">
                <input 
                  type="checkbox" 
                  id="gift-checkbox" 
                  className="gift-checkbox"
                  checked={isGift}
                  onChange={() => setIsGift(!isGift)}
                />
                <label htmlFor="gift-checkbox" className="gift-label">
                  Mark order as a gift
                  <span className="info-icon" title="Gift orders will be wrapped and can include a message">ⓘ</span>
                </label>
              </div>
              
              <div className="subtotal">
                Subtotal ({cartItems.reduce((count, item) => count + item.quantity, 0)} item{cartItems.reduce((count, item) => count + item.quantity, 0) > 1 ? 's' : ''}): CA${cartTotal}
              </div>
              
              <button 
                className="checkout-button"
                onClick={proceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
