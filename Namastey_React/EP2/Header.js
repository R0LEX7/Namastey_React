import React , {useState , useEffect} from   'react'
import { onAuthStateChanged , signOut } from "firebase/auth";
import { auth } from "./Config/firebase-config";
import { Link } from 'react-router-dom';


const Header = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
    <div className="navbar">
      
       
        <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        {user === null ? (
          <Link to = '/authentication'><li>Log In</li></Link>
        ) : (<li onClick={() =>signOut(auth)}>Log Out</li>)}
        
        </ul>
    </div>
    </>
  )
}

export default Header
