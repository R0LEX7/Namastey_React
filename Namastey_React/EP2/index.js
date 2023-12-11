import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./Components/Pages/Menu";
import "@fontsource/poppins/300.css"; // Light
import "@fontsource/poppins/400.css"; // Regular
import "@fontsource/poppins/500.css"; // Medium
import "@fontsource/poppins/700.css"; // Bold
import "@fontsource/montserrat/300.css"; // Light
import "@fontsource/montserrat/400.css"; // Regular
import "@fontsource/montserrat/500.css"; // Medium
import "@fontsource/montserrat/700.css"; // Bold
import Authentication from "./Components/Auth/authentication";
import CartPage from "./Components/Pages/CartPage";
import AboutUser from "./Components/Auth/AboutUser";
import { CartProvider } from "./Context/CartContext";
import LabelBottomNavigation from "./Components/Layout/LabelBottomNavigation";



const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        
          <>
          <App/>
          
          </>
        
      ),
    },
    {
      path: "/restaurant/:id",
      element: (
         <>
          <Menu />
        <LabelBottomNavigation/>
         </>
      ),
    },
    {
      path: "/authentication",
      element: (
         
          <><Authentication />
          <LabelBottomNavigation/>
          </>
      ),
    },
    
    {
      path: "/cart",
      element: (
        <>
          <CartPage />
        <LabelBottomNavigation/>
        </>
      ),
    },{
      path: "/about-user",
      element: <AboutUser/>,
    }
  ]);

root.render(<CartProvider>
  <RouterProvider router={router} />
  </CartProvider>
  );
