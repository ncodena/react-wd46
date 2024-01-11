import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
    <nav>
       <ul>
           <li><NavLink to='/todos'>Todos</NavLink></li>
       </ul>
    </nav>
    <Outlet/>
   </div>

  )
}

export default Navbar