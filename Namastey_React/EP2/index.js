import React from 'react';
import ReactDOM from 'react-dom/client';
import  App  from './app';
import "./style.css";
import { createBrowserRouter ,RouterProvider } from 'react-router-dom';
import Menu from './Menu';

const router = createBrowserRouter([{
    path: '/',
    element: <App/>
},{
    path: '/restaurant/:id',
    element: <Menu/>
}])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router = {router} />);

;
