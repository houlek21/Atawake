import React, { useState } from 'react';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    seller_id: '', // Assuming seller ID is needed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Product created successfully');
        setFormData({ name: '', description: '', price: '', category: '', stock: '', seller_id: '' });
      } else {
        alert(`Error creating product: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Network error: Unable to connect to the server.');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />
      </div>
      <div>
        <label>Stock Quantity:</label>
        <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
      </div>
      <div>
        <label>Seller ID:</label>
        <input type="text" name="seller_id" value={formData.seller_id} onChange={handleChange} required />
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProduct;
