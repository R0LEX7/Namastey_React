import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./Menu";
import "@fontsource/poppins/300.css"; // Light
import "@fontsource/poppins/400.css"; // Regular
import "@fontsource/poppins/500.css"; // Medium
import "@fontsource/poppins/700.css"; // Bold

import "@fontsource/montserrat/300.css"; // Light
import "@fontsource/montserrat/400.css"; // Regular
import "@fontsource/montserrat/500.css"; // Medium
import "@fontsource/montserrat/700.css"; // Bold
import Authentication from "./Auth/authentication";
import SignIn from "./Auth/SignIn";
import CartPage from "./CartPage";
import LabelBottomNavigation from "./LabelBottomNavigation";
import Layout from "./Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        
          <>
          <App/>
          <Layout/>
          </>
        
      ),
    },
    {
      path: "/restaurant/:id",
      element: (
        <Layout> {/* Wrap the Menu component with the Layout */}
          <Menu />
        </Layout>
      ),
    },
    {
      path: "/authentication",
      element: (
         
          <><Authentication />
          <Layout/>
          </>
      ),
    },
    
    {
      path: "/cart",
      element: (
        <>
          <CartPage />
        <Layout></Layout>
        </>
      ),
    },
  ]);

root.render(<RouterProvider router={router} />);
