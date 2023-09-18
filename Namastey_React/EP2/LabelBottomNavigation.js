import React , {useState , useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import CartContext from './CartContext';
import Badge from '@mui/material/Badge';

export default function LabelBottomNavigation() {
  const location = useLocation();

  const {cartItems} = useContext(CartContext);





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
            {cartItems.length > 0 ? ( <Badge  className='badge' badgeContent={cartItems.length} color="primary"> 
          <AiOutlineShoppingCart />
          </Badge>) : (<AiOutlineShoppingCart/>)}
         
           <span>cart</span>
          </Link>
        </li>
        <li>
          <Link to="/authentication" className={location.pathname === '/authentication' ? 'active' : ''}>
            <VscAccount /><span>profile</span>
          </Link>
        </li>
      </ul>
    </nav>
    </div> 
  );
}
