import React , {useState , useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Config/firebase-config'
import { getDatabase, ref, onValue } from 'firebase/database';
import CartItem from './CartItem'
// import firebase


const CartPage = () => {
    const [user, setUser] = useState(null)
    const [cartItems, setCartItems] = useState([])


    useEffect(() => {
        onAuthStateChanged(auth , user => {
            if(user){
                setUser(user);
                getCartItems(user);
            }else{
                setUser(null);
            }
            
        })
        


      }, []);

    const  getCartItems = (user) => {
          const db = getDatabase();
          const cartRef = ref(db, `carts/${user.uid}/`);
          
          onValue(cartRef, (snapshot) => {
            const cartData = snapshot.val();
            if (cartData) {
              const cartItemsArray = Object.values(cartData);
              setCartItems(cartItemsArray);
            } else {
              // Handle when the user's cart is empty
              setCartItems([]);
            }
          });
        } 
      
      


  return (
    <>
    {user === null ? (<h1>login please</h1>):(
        <>
        {cartItems.map((item , index) => {
            return <CartItem key={index} item={item} /> 
        })}
        </>
    )}
    </>
  )
}

export default CartPage