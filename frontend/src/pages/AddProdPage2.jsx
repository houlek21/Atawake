import "../css/AddProd2.css"
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';

export function addItemPage2() {
    const [productData, setProductData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Get saved product data from localStorage
        const savedData = localStorage.getItem('p1');
        if (savedData) {
            setProductData(JSON.parse(savedData));
        } else {
            // If no data found, redirect back to step 1
            navigate('/addprod1');
        }
    }, [navigate]);

    // Complete the product creation by updating with remaining details
    const upload = async () => {
        if (!productData) return;

        const detail = document.getElementById("detail").value;
        const price = document.getElementById("price").value;

        // Validation
        if (!detail || !price) {
            setErrorMessage('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            // Update the product with the full details
            const response = await fetch(`http://localhost:5000/api/products/${productData.productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: productData.name,
                    description: detail,
                    price: parseFloat(price),
                    category_id: productData.category,
                    is_active: true // Now activate the product
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const data = await response.json();
            console.log('Product updated successfully:', data);

            // Redirect to dashboard after successful submission
            window.location.href = "http://localhost:5173/dashboard";
            
        } catch (error) {
            console.error('Error updating product:', error);
            setErrorMessage('Failed to complete product listing. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle adding tags (placeholder for now)
    const handleAddTag = () => {
        console.log("Add tag button clicked");
        // TO-DO: Implement Tags 
    };

    // If data is still loading, show a loading indicator
    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-an-ad">
            <div className="frame-188">
                <div id="contain" className="post-an-ad">
                    <div className="ad-details">
                        <div className="ad-details2">Ad Details</div>
                        <div className="product-description">Product Description</div>
                        <textarea placeholder="Write a brief description of your product." id="detail" cols="10" rows="5" className="rectangle-93"></textarea>
                        <div className="tags-section">
                            <label className="tags-label">Tags</label>
                            <div className="tags-input-container">
                                <div className="tags-search-input">
                                    <span className="search-icon">🔍</span>
                                    <input type="text" placeholder="Search" />
                                </div>
                                <button className="tags-add-button" onClick={handleAddTag}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="media">
                        <div className="media-section">
                            <div className="media2">Media</div>

                            <div className="upgrid" id="imgrid">
                                <ImageUploader
                                    productId={productData.productId}
                                    token={localStorage.getItem('token')}
                                />
                            </div>

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
                        </div>
                    </div>

                    <div className="price">
                        <div className="price2">Price</div>
                        <div className="cash-amount">
                            <div className="frame-170">
                                <div className="cash-amount2">Cash Amount</div>
                                <input id="price" className="rectangle-106" type="number" step="0.01" min="0" />
                            </div>
                        </div>
                    </div>

                    <div className="frame-187">
                        <a href="http://localhost:5173/addprod1">
                            <div className="shop-button">
                                <div className="shop2">Back</div>
                            </div>
                        </a>

                        <div className="frame-186">
                            <div className="view-all">
                                <div className="sell-on-atawake2">Preview</div>
                            </div>
                            <div 
                                onClick={isSubmitting ? null : upload} 
                                className="shop-button2"
                                style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'default' : 'pointer' }}
                            >
                                <div className="shop2">{isSubmitting ? 'Posting...' : 'Post Ad'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default addItemPage2;