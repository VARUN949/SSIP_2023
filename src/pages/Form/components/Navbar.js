import React from 'react'
import './Navbar.css'; 

import {GiHamburgerMenu} from 'react-icons/gi'

const Navbar = () => {
  return (
    <>

   <nav className="main-nav">
    <div className="hamburger-menu">
<a href="#">
  <GiHamburgerMenu/>
</a>
    </div>
    <div className="logo">
      
 <h2>
  Hello,User
 </h2>
    </div>
<div className="menu-link">
  <ul>
    <li>
      <a href="#">Request for location update</a>
    </li>
    <li>
      <a href="#">Add a location</a>
    </li>
  </ul>
</div>
   </nav>
 
    </>
  )
}

export default Navbar
