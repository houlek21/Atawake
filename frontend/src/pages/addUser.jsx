import React, { useState, useEffect } from 'react';
import '../css/addUser.css';

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState([])

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
        alert('User created successfully');
        setFormData({ first_name: '', last_name: '', email: '', phone: '', address: '', password: '', user_type: 'regular' });
      } else {
        alert(`Error creating user: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Network error: Unable to connect to the server.');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/users/") // Fetch users from backend
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>User Type:</label>
          <select name="user_type" value={formData.user_type} onChange={handleChange}>
            <option value="regular">Regular</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Create User</button>
      </form>
      <hr />
      <h2>Users</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <strong>{user.first_name}</strong> - {user.email} - {user.phone}
            </li>
          ))
        ) : (
          <p>Loading users...</p>
        )}
      </ul>
    </div>
  );
};

export default AddUser;
