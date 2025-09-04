import { useState } from 'react'
import Notepad from './components/Notepad'
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import { useLocation } from "react-router-dom";

function App() {
  const Location = useLocation();
  
  return (
    <div>
    {Location.pathname=="/"?"": <Notepad/>}
      <Outlet/>
    </div>
      
  )
}
export default App
