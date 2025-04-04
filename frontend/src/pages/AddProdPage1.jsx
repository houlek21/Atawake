import "../css/AddProd1.css";
import React, { useState, useEffect } from 'react';
import logo from "../assets/icons/light-bulb.svg";

const addItemPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // handles creation of initial product
  async function next() {
    const title = document.getElementById("title").value;
    const categoryValue = document.getElementById("myDropdown").value;
    
    // Validate inputs
    if (!title.trim()) {
      setErrorMessage('Please enter a product title');
      return;
    }
    
    if (categoryValue === 'Select a category' || !categoryValue) {
      setErrorMessage('Please select a category');
      return;
    }
    
    // Clear any previous errors
    setErrorMessage(null);
    setIsLoading(true);
    
    try {
      // Create minimal product entry
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          name: title,
          category_id: categoryValue,
          description: '', // Placeholder description, will be updated on page 2
          price: 0,        // Placeholder price, will be updated on page 2
          quantity: 1,     // Default quantity
          is_active: false // Product not active until completed
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const data = await response.json();
      
      // Save product ID and first page data to localStorage
      const productInfo = {
        name: title,
        category: categoryValue,
        productId: data.product.id
      };
      
      localStorage.setItem('p1', JSON.stringify(productInfo));
      console.log('Saved product info:', productInfo);
      
      // Navigate to the next page
      window.location.href = "http://localhost:5173/addprod2";
      
    } catch (error) {
      console.error('Error creating product:', error);
      setErrorMessage('Failed to create product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="post-an-ad">
      <div className="frame-220">
        <div className="ad-title">
          <div className="frame-72">
            <div className="ad-title2">
              <div className="product-title">Product Title</div>
              <div className="tips">
                <img className="heroicons-solid-light-bulb" src={logo} />
                <div className="write-a-descriptive-title-for-a-high-performing-ad">
                  Write a descriptive title for a high performing ad
                </div>
              </div>
              <input type="text" className="frame-94" id="title"></input>
            </div>
          </div>
        </div>
        <div className="select-a-category">
          <div className="frame-291">
            <div className="frame-71">
              <div className="select-a-category2">Select a Category</div>

              <select id="myDropdown" className="frame-712">
                <option className="dropopt1" value="Select a category" selected disabled>Select</option>
                <option className="dropopt1" value="1">Jewelry and Accessorie</option>
                <option className="dropopt1" value="2">Clothing and Textiles</option>
                <option className="dropopt1" value="3">Carvings and Sculptures</option>
                <option className="dropopt1" value="4">Home Decor</option>
                <option className="dropopt1" value="5">Pottery & Ceramics</option>
                <option className="dropopt1" value="6">Beadwork & Quillwork</option>
              </select>
            </div>
          </div>
          {/* Error message display */}
          {errorMessage && (
            <div style={{ 
              color: '#93151f', 
              marginTop: '10px', 
              fontFamily: 'var(--body-font-family, "Inter-Regular", sans-serif)',
              fontSize: 'var(--body-font-size, 16px)'
            }}>
              {errorMessage}
            </div>
          )}
          <div className="frame-166">
            <a href="http://localhost:5173/">
              <div className="view-all">
                <div className="sell-on-atawake2">Back</div>
              </div>
            </a>
            <div 
              onClick={isLoading ? null : next} 
              className="shop-button" 
              style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'default' : 'pointer' }}
            >
              <div className="shop">{isLoading ? 'Creating...' : 'Next'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default addItemPage;