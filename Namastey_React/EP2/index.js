import React from 'react';
import ReactDOM from 'react-dom/client';
import  App  from './app';
import "./style.css";
import { createBrowserRouter ,RouterProvider } from 'react-router-dom';
import Menu from './Menu';
import '@fontsource/poppins/300.css'; // Light
import '@fontsource/poppins/400.css'; // Regular
import '@fontsource/poppins/500.css'; // Medium
import '@fontsource/poppins/700.css'; // Bold

import '@fontsource/montserrat/300.css'; // Light
import '@fontsource/montserrat/400.css'; // Regular
import '@fontsource/montserrat/500.css'; // Medium
import '@fontsource/montserrat/700.css'; // Bold
import Authentication from './Auth/authentication';
import SignIn from './Auth/SignIn';



const router = createBrowserRouter([{
    path: '/',
    element: <App/>
},{
    path: '/restaurant/:id',
    element: <Menu/>
},{
    path : '/authentication',
    element : <Authentication/>,
    
},{
    path: '/signup',
    element: <SignIn/>
}
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router = {router} />);

;
