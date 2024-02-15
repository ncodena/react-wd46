import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes/routes';
import { useAuth } from './context/AuthContext';
import Navbar from "./components/Navbar";
import NotFound from "./views/NotFound";

function App() {
  const {token} = useAuth();

  return (
    <>
      <Navbar/>
      <Routes>
        {publicRoutes.map(({path, element}) => (
          <Route key={path} path={path} element={!token ? element : <Navigate to="/" />}/>
        ))}

        {privateRoutes.map(({path, element}) => (
          <Route key={path} path={path} element={token ? element : <Navigate to="/login" />}/>
        ))}

        {/* Explicit route for the NotFound page */}
        <Route path="/not-found" element={<NotFound/>}/>
        {/* Catch-all routes for 404 Found page */}
        <Route path="*" element={<Navigate to="/not-found" replace/>}/>
        
      </Routes>
    </>
  )
}

export default App
