import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddUser from "./addUser.jsx";

const HomePageContent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="container">
      <h1>Welcome to the Home Page 🚀</h1>
    </div>
  );
};

const Home = () => {
  return (
    <Router>
      <nav>
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/add-user" className="hover:underline">Add User</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePageContent />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </Router>
  );
};

export default Home;
