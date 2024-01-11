import './App.css';
import Todo from './views/Todo';
import Todos from './views/Todos';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Navbar from './components/Navbar';

function App() {
  

  return (
    <>
    <Routes>
      

      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />

      <Route path="todos" element={<Navbar />}>
        <Route index element={<Todos/>}/>
        <Route path=':id' element={<Todo/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
