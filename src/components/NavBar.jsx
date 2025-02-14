import "../css/NavBar.css";
import { NavLink } from "react-router-dom";
import { useTheme } from "./Context/ThemeContext";
import Sun from "../assets/sun.png";
import Moon from "../assets/moon.png";
import { useState, useRef, useEffect } from "react";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";


const searchClient = algoliasearch(
  "B5ADYZAV17",
  "63655bb3d3ed521885ef336dad79e9cc"
);

const CustomHit = ({ hit }) => (
  <div className="search-result-item">
    <img src={hit.image} alt={hit.title} className="search-result-image" />
    <div className="result-info">
      <p>{hit.title}</p>
      <p className="price">${hit.price}</p>
    </div>
  </div>
);

const NavBar = () => {
  const { theme, toggleTheme } = useTheme(); // Access theme context
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to control search visibility
  const searchInputRef = useRef(null); // Reference to the search input

  // Handle input change in the SearchBox
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsSearchVisible(true); // Show results when user starts typing
  };

  // Clear the search term and hide results when the user clicks the cancel button
  const handleCancelSearch = () => {
    setSearchTerm("");
    setIsSearchVisible(false); // Hide search results when the search is cancelled
  };

  // Hide search results when clicking outside the search box
  const handleClickOutside = (event) => {
    if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
      setIsSearchVisible(false); // Hide search results if clicked outside
    }
  };

  // Add event listener for clicks outside the search box
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar ${theme}`}>
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/form" className="navbar-link">
            Loggin
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/" className="navbar-link">
            Api
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/userpage" className="navbar-link">
            User
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/react" className="navbar-link">
            CosasReact
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/useReducer" className="navbar-link">
            Reducer
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/Voz" className="navbar-link">
            Voz
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/Report" className="navbar-link">
            Infrome LOL
          </NavLink>
        </li>
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
            <div className="search-box-container">
              <SearchBox
                onChange={handleSearchChange}
                ref={searchInputRef}
                autoFocus
              />
              {/* Cancel search button */}
              {searchTerm && (
                <button
                  className="cancel-search-button"
                  onClick={handleCancelSearch}
                >
                  &#10006; {/* X icon */}
                </button>
              )}
            </div>

            {/* Only render Hits if there is a search term and isSearchVisible is true */}
            {isSearchVisible && searchTerm && <Hits hitComponent={CustomHit} />}
          </InstantSearch>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

