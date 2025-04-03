import { useState } from "react";
import "../css/SearchBar.css";
import SearchIcon from "../assets/icons/search.svg";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <img src={SearchIcon} alt="Search" className="search-icon" />
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
