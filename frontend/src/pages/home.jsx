import { useEffect, useState } from "react";
import "../App.css"; // Ensure correct path

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users") // Fetch users from backend
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
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
    </div>
  );
}

export default Home;
