import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home"; // Homepage
import TestPage from "./pages/testPage"; // Additional test page
import AddProduct from "./pages/addProduct";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/test">Test Page</Link> | <Link to="/addProduct">Add Product</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/addProduct" element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
