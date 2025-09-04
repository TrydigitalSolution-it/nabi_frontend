import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';   // 👈 must be here
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SignUp from './components/SignUp.jsx';

import Login from './components/Login.jsx';
import Notepad from './components/Notepad.jsx';
import App from './App.jsx';

import Dashboard from './components/dashboard/Dashboard.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,   
    children: [
      { index:true, element: <Notepad /> },
      { path: "/signin", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
