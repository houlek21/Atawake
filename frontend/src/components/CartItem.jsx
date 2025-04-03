import React from 'react';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="cart-item">
      <img 
        src={item.image_url} 
        alt={item.product_name} 
        className="item-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://images.everydayhealth.com/images/news/an-egg-day-lower-dementia-risk-1440x810.jpg";
        }}
      />
      
      <div className="item-details">
        <h3>{item.product_name}</h3>
        <p>{item.description}</p>
        
        {item.category_name && <p>Category: {item.category_name}</p>}
        {item.seller_name && <p>Seller: {item.seller_name}</p>}
        
        <div className="item-actions">
          <div className="quantity-control">
            <button 
              className="quantity-button"
              onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
            >
              -
            </button>
            <span className="quantity-display">{item.quantity}</span>
            <button 
              className="quantity-button"
              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
            >
              +
            </button>
          </div>
          
          <button 
            className="action-button" 
            title="Remove item"
            onClick={() => removeItem(item.product_id)}
          >
            🗑️
          </button>
          
          <button className="action-button" title="Add to favorites">
            ♡
          </button>
          
          <button className="action-button" title="Share">
            ↗
          </button>
        </div>
      </div>
      
      <div className="item-price">
        CA${parseFloat(item.price).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;