import { useState } from "react";
import "../css/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <i className="fas fa-search"></i>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInput}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
