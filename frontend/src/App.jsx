import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import TestPage from "./pages/testPage";
import CreateUser from "./pages/createUser";
import CreateProduct from "./pages/createProduct";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |
        <Link to="/test">Test Page</Link> |
        <Link to="/create-user">Add User</Link> |
        <Link to="/create-product">Add Product</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
