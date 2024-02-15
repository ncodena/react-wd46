import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const {user, logout} = useAuth();

  return (
    <div>
    <nav>

      {user ? (
        <>
          <p>Welcome {user.name}</p>
          <p onClick={logout}>Logout</p>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/countries'>Countries</NavLink>
          <NavLink to='/users'>Users</NavLink>
        </>
      ): <NavLink to='/login'>Login</NavLink>}

      
      
    </nav>
    <Outlet/>
   </div>

  )
}

export default Navbar