import { useEffect, useState } from "react";
import "../App.css"; // Ensure correct path

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users") // Fetch users from backend
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/products") // Fetch products from backend
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container">
      <h1>Welcome to the Home Page 🚀</h1>
      <p>Below are some users from our database:</p>
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
      
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}