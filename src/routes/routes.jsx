// Import your component pages
import Country from '../views/Country';
import Countries from '../views/Countries';
import Home from '../views/Home';
import Users from '../views/Users';
import NewUser from '../views/NewUser';
import NewCountry from '../views/NewCountry';
import Login from '../views/Login';
import Films from '../views/Films';

// Public routes are accessible without authentication
export const publicRoutes = [
  { path: '/login', element: <Login /> }
  // Add more public routes here
];

// Private routes require authentication
export const privateRoutes = [
  { path: '/', element: <Home /> },
  { path: '/countries', element: <Countries /> },
  { path: '/countries/:code', element: <Country /> },
  { path: '/countries/new_country', element: <NewCountry /> },
  { path: '/users', element: <Users /> },
  { path: '/users/new_user', element: <NewUser /> },
  { path: '/films', element: <Films /> },
];