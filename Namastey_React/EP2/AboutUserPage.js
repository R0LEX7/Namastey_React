import React, { useContext, useState, useEffect } from "react";
import CartContext from "./CartContext";
import { auth } from "./Config/firebase-config";
import { getDatabase, ref, onValue } from "firebase/database";
import Loader from "./Loader";


import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const AboutUserPage = () => {
  const { user } = useContext(CartContext);
  const [aboutUser, setAboutUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    getUserDetails(user);
  }, []);

  const db = getDatabase();

  const getUserDetails = (user) => {
    const userRef = ref(db, `users/${user.uid}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setAboutUser(userData);
        console.log(userData);
      }
      setLoading(false);
    });
  };
  return (
    <>
      {loading ? (<Loader/>) : (<div className="form-box">
        <div className="user-about">

        <div className="user-col">
          {" "}
          <label htmlFor="username">Username:</label>
          <label htmlFor="email">Email:</label>
          <label htmlFor="Phone">Phone:</label>
          <label htmlFor="address">Address:</label>
        </div>
        <div className="user-col">
           <h4>{aboutUser?.name}</h4> 
           <h4>{user?.email}</h4> 
           <h4>{aboutUser?.phoneNumber}</h4> 
           <h4>{aboutUser?.address}</h4> 
            
            </div>
        </div>
        <Link to = '/about-user'><button>edit profile</button></Link>
        <button onClick={() => signOut(auth)}>Log out</button>

      </div>)}
    </>
  );
};

export default AboutUserPage;
