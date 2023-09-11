import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import { BsSearch } from 'react-icons/bs';

export default function LabelBottomNavigation() {
  const location = useLocation();

  



  return (
    <div className="navbar-box">

    <nav className="custom-bottom-nav">
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <AiOutlineHome /> <span>home</span>
          </Link>
        </li>
        <li>
          <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
            <AiOutlineShoppingCart /> <span>cart</span>
          </Link>
        </li>
        <li>
          <Link to="/authentication" className={location.pathname === '/authentication' ? 'active' : ''}>
            <VscAccount /><span>account</span>
          </Link>
        </li>
      </ul>
    </nav>
    </div> 
  );
}
