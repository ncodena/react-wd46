import './App.css';
import { Routes, Route } from 'react-router-dom';
import MemeGenerator from './views/MemeGenerator';

function App() {
  
  return (
    <>
    <Routes>
      <Route path='/' element={<MemeGenerator/>} />
    </Routes>
    </>
  )
}

export default App
