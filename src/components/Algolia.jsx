import "../css/NavBar.css";
import { NavLink } from "react-router-dom";
import { useTheme } from "./Context/ThemeContext";
import Sun from "../assets/Sun.png";
import Moon from "../assets/Moon.png";
import { useState } from "react";
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';

// Algolia Client Setup
const searchClient = algoliasearch(
  'B5ADYZAV17',
  '63655bb3d3ed521885ef336dad79e9cc'
);

const NavBar = () => {
  const { theme, toggleTheme } = useTheme(); // Access theme context
  const [isSearching, setIsSearching] = useState(false); // State to show/hide dropdown

  return (
    <nav className={`navbar ${theme}`}>
      <ul className="navbar-list">
        {/* Your other nav items */}
        
        <li className="tog">
          <img src={Sun} alt="Sun Logo" />
          <label className="theme-toggle">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <span className="slider"></span>
          </label>
          <img src={Moon} alt="Moon Logo" />
        </li>

        {/* Algolia Search Bar */}
        <li className="navbar-item search-bar">
          <InstantSearch searchClient={searchClient} indexName="movies_index">
            <SearchBox />
            <Hits />
          </InstantSearch>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

{/*
<li className="navbar-item search-bar">
<form onSubmit={handleSearch} className="search-form">
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-input"
  />
  <button type="submit" className="search-button">
    Go
  </button>
</form>
{isSearching && <p>Searching...</p>}
{searchResults.length > 0 && (
  <div className="search-results">
    {searchResults.map((result) => (
      <div key={result.id} className="search-result-item">
        <img
          src={result.image}
          alt={result.title}
          className="search-result-image"
        />
        <div className="result-info">
          <p>{result.title}</p>
          <p className="price">${result.price}</p>
        </div>
      </div>
    ))}
  </div>
)} */}
