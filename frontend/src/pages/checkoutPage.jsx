import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../css/Checkout.css';
import bannerImage from '../assets/checkout-banner.png';

const stripePromise = loadStripe('pk_test_51R9ZSbPlNRynQIWiMt0XdyFADdmZlmVt8GgWQ1DiUCEABaI5nRSMvZ75aZbmUADFyUnleyP3NXsOwgvVcYPsEQEn00NLw45EeD');

const cardElementOptions = {
  style: {
    base: {
      color: '#392516',
      fontFamily: 'Inter-Regular, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#93151f',
      iconColor: '#93151f',
    },
  },
};

const CheckoutForm = ({ cartData, onSuccess, onError, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [addressFields, setAddressFields] = useState({
    street: '',
    city: '',
    province: '',
    postalCode: ''
  });
  const [deliveryCost, setDeliveryCost] = useState(15);

  // When showing the address form, pre-fill fields if address exists
  useEffect(() => {
    if (showAddressInput && deliveryAddress) {
      const parts = deliveryAddress.split(', ');
      if (parts.length >= 4) {
        setAddressFields({
          street: parts[0] || '',
          city: parts[1] || '',
          province: parts[2] || '',
          postalCode: parts[3] || ''
        });
      }
    }
  }, [showAddressInput, deliveryAddress]);

  const handleDeliveryChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "CA$25 (Express)") {
      setDeliveryCost(25);
    } else {
      setDeliveryCost(15);
    }
  };

  const handleCardChange = (event) => {
    setIsCardComplete(event.complete);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!deliveryAddress) {
      alert('Please add a delivery address');
      return;
    }

    if (!isCardComplete) {
      alert('Please enter your card information');
      return;
    }

    // Check if user is logged in before proceeding
    if (!localStorage.getItem('token')) {
      alert('You need to be logged in to complete your purchase');
      navigate('/login', { state: { returnTo: '/checkout' } });
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Create checkout session with backend
      const sessionResponse = await fetch('http://localhost:5000/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify({
          shipping_address: deliveryAddress,
          contact_email: localStorage.getItem('userEmail') || 'test@example.com', // Use stored email or fallback
          contact_phone: ''
        })
      });

      if (!sessionResponse.ok) {
        if (sessionResponse.status === 403) {
          // Token is invalid or expired
          localStorage.removeItem('token'); // Clear the invalid token
          alert('Your session has expired. Please log in again.');
          navigate('/login', { state: { returnTo: '/checkout' } });
          return;
        }
        
        const errorData = await sessionResponse.json();
        throw new Error(errorData.message || 'Failed to create checkout session');
      }

      const sessionData = await sessionResponse.json();
      
      // Confirm the payment using Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        sessionData.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        throw new Error(error.message || 'Payment failed');
      }

      // Process the completed payment with your backend
      const processResponse = await fetch('http://localhost:5000/api/checkout/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify({ 
          paymentIntentId: paymentIntent.id 
        })
      });

      if (!processResponse.ok) {
        const processError = await processResponse.json();
        throw new Error(processError.message || 'Failed to process payment');
      }

      const result = await processResponse.json();
      onSuccess(result);
      
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error.message);
      onError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const tax = 0.05 * (parseFloat(cartData.subtotal || 0));

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <img 
          className="banner-image"
          src={bannerImage}
          alt="Decorative header" 
        />
        
        <form onSubmit={handleSubmit}>
          {/* Delivery Section */}
          <div className="checkout-section">
            <h2 className="section-title">Delivery to</h2>
            
            {showAddressInput ? (
              <div className="address-form">
                <div className="address-field">
                  <label htmlFor="street-address">Street Address</label>
                  <input
                    type="text"
                    id="street-address"
                    className="address-input"
                    placeholder="Street address, apartment, suite, etc."
                    value={addressFields.street}
                    onChange={(e) => setAddressFields({...addressFields, street: e.target.value})}
                  />
                </div>
                
                <div className="address-field">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    className="address-input"
                    placeholder="City"
                    value={addressFields.city}
                    onChange={(e) => setAddressFields({...addressFields, city: e.target.value})}
                  />
                </div>
                
                <div className="address-row">
                  <div className="address-field half">
                    <label htmlFor="province">Province</label>
                    <input
                      type="text"
                      id="province"
                      className="address-input"
                      placeholder="Province"
                      value={addressFields.province}
                      onChange={(e) => setAddressFields({...addressFields, province: e.target.value})}
                    />
                  </div>
                  <div className="address-field half">
                    <label htmlFor="postal-code">Postal Code</label>
                    <input
                      type="text"
                      id="postal-code"
                      className="address-input"
                      placeholder="Postal Code"
                      value={addressFields.postalCode}
                      onChange={(e) => setAddressFields({...addressFields, postalCode: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="address-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setShowAddressInput(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn-save"
                    onClick={() => {
                      if (addressFields.street && addressFields.city && addressFields.province && addressFields.postalCode) {
                        // Combine all fields into a single string for the backend
                        const fullAddress = `${addressFields.street}, ${addressFields.city}, ${addressFields.province}, ${addressFields.postalCode}`;
                        setDeliveryAddress(fullAddress);
                        setShowAddressInput(false);
                      } else {
                        alert('Please fill in all address fields');
                      }
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="delivery-option"
                onClick={() => setShowAddressInput(true)}
              >
                <span className="delivery-option-icon">+</span>
                <span className="delivery-option-text">
                  {deliveryAddress ? deliveryAddress : 'Add delivery address'}
                </span>
              </div>
            )}
            
            <select className="delivery-dropdown" onChange={handleDeliveryChange}>
              <option value="CA$15 (Standard)">CA$15 (Standard)</option>
              <option value="CA$25 (Express)">CA$25 (Express)</option>
            </select>
          </div>
          
          {/* Payment Section */}
          <div className="checkout-section">
            <h2 className="section-title">Payment</h2>
            
            {/* Card Element is always shown */}
            <div className="stripe-container">
              <CardElement 
                options={cardElementOptions} 
                onChange={handleCardChange}
              />
              {paymentError && (
                <div className="payment-error">{paymentError}</div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="checkout-section">
            <div className="order-summary-item">
              <span className="order-summary-label">Item(s) total</span>
              <span>CA${cartData.subtotal || '0.00'}</span>
            </div>
            <div className="order-summary-item">
              <span className="order-summary-label">Delivery</span>
              <span>CA${deliveryCost.toFixed(2)}</span>
            </div>
            <div className="order-summary-item">
              <span className="order-summary-label">Tax</span>
              <span>CA${tax.toFixed(2)}</span>
            </div>
            <div className="order-total">
              <span>Order total</span>
              <span>CA${(parseFloat(cartData.subtotal || 0) + deliveryCost + tax).toFixed(2)}</span>
            </div>
          </div>
          
          {/* Continue Button */}
          <button
            type="submit"
            disabled={!stripe || isProcessing || !deliveryAddress || !isCardComplete}
            className="btn-continue"
          >
            {isProcessing ? 'Processing...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState({ cartItems: [], subtotal: '0.00', total: '0.00' });
  const [isTokenValid, setIsTokenValid] = useState(false);

  // Validate token and fetch cart data
  useEffect(() => {
    const validateTokenAndFetchCart = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Validate token by making a request to a protected endpoint
      try {
        const validateResponse = await fetch('http://localhost:5000/api/users/validate-token', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!validateResponse.ok) {
          // Invalid token - clear it and show auth message
          localStorage.removeItem('token');
          setIsTokenValid(false);
          setIsLoading(false);
          return;
        }

        // Token is valid, proceed to fetch cart
        setIsTokenValid(true);
        
        const cartResponse = await fetch('http://localhost:5000/api/cart/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });
        
        if (!cartResponse.ok) {
          throw new Error('Failed to fetch cart');
        }
        
        const data = await cartResponse.json();
        setCartData(data);
        
        // If cart is empty, redirect to cart page
        if (!data.cartItems || data.cartItems.length === 0) {
          alert('Your cart is empty. Please add items before checkout.');
          navigate('/cart');
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    validateTokenAndFetchCart();
  }, [navigate]);

  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    setPaymentComplete(true);
  };

  const handlePaymentError = (error) => {
    // Check if the error is about authentication
    if (error.message.includes('token') || error.message.includes('authentication') || error.message.includes('unauthorized')) {
      localStorage.removeItem('token');
      setIsTokenValid(false);
    } else {
      console.error('Payment failed:', error);
      setError(error.message);
    }
  };

  if (!isTokenValid && !isLoading) {
    return (
      <div className="checkout-container">
        <div className="checkout-wrapper">
          <div className="auth-message-overlay">
            <div className="auth-message-content">
              <h2>Authentication Required</h2>
              <p>You need to be logged in to proceed with checkout.</p>
              <div className="auth-buttons">
                <button 
                  onClick={() => navigate('/login', { state: { returnTo: '/checkout' } })}
                  className="auth-login-btn"
                >
                  Log In
                </button>
                <button 
                  onClick={() => navigate('/signup', { state: { returnTo: '/checkout' } })}
                  className="auth-signup-btn"
                >
                  Sign Up
                </button>
              </div>
              <button
                onClick={() => navigate('/cart')}
                className="auth-return-cart"
              >
                Return to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="checkout-container">
        <div className="checkout-wrapper">
          <div className="loading">Loading checkout information...</div>
        </div>
      </div>
    );
  }

  if (error && !paymentComplete) {
    return (
      <div className="checkout-container">
        <div className="checkout-wrapper">
          <div className="error">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/cart')}>Return to Cart</button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentComplete) {
    return (
      <div className="checkout-container">
        <div className="checkout-wrapper">
          <div className="success-container">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Payment Successful!</h2>
            <p className="success-message">Your order has been placed successfully.</p>
            <button 
              onClick={() => window.location.href = '/orders'} 
              className="btn-view-orders"
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        cartData={cartData}
        onSuccess={handlePaymentSuccess} 
        onError={handlePaymentError}
        navigate={navigate}
      />
    </Elements>
  );
};

export default CheckoutPage;
