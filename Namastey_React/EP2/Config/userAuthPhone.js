import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut,
  
} from "firebase/auth";
import { auth } from "./firebase-config";
import Authentication from "../Auth/authentication";

export const userAuthContext = createContext({
    
});

export  function userAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logOut() {
    return signOut(auth);
  }

  function setUpRecaptcha(number) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    // recaptchaVerifier.render();
    // return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  return (
    <userAuthContext.Provider
      value={{
        logOut ,
        setUpRecaptcha,
      }}
    >
     {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth(){
    return useContext(userAuthContext)
}