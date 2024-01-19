import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Posts from './views/Posts';


function App() {
  
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/posts' element={<Posts/>} />
    </Routes>
    </>
  )
}

export default App
