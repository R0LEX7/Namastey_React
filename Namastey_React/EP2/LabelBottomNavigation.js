import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import { BsSearch } from 'react-icons/bs';

export default function LabelBottomNavigation({ searchInputRef }) {
  const location = useLocation();

  

  const handleSearchClick = () => {
    // Focus on the search input when the "Search" button is clicked
    console.log('Clicked'); 
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="navbar-box">

    <nav className="custom-bottom-nav">
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <AiOutlineHome />
          </Link>
        </li>
        <li onClick={handleSearchClick}>
          
            <BsSearch />
          
        </li>
        <li>
          <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
            <AiOutlineShoppingCart />
          </Link>
        </li>
        <li>
          <Link to="/authentication" className={location.pathname === '/authentication' ? 'active' : ''}>
            <VscAccount />
          </Link>
        </li>
      </ul>
    </nav>
    </div> 
  );
}
