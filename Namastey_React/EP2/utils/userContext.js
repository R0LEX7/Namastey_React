import React , {createContext } from "react";

// Context 
const userContext = createContext({
    name: "Batman",
    email: "john@doe",
  })

  export default userContext;