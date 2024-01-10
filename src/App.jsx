import { useState, useEffect } from 'react';
import './App.css';
import ListElement from './components/ListElement';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]); // State for storing fetched todos
  const [loading, seLoading] = useState(true); // State that holds boolean value to use for data fetching

  //Runs on every render
  // useEffect(() => {
  //   console.log('it is running')
  // });
  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      seLoading(false)
    }
  };
//Runs only on the first render, in this case, to load data fetched from API
  useEffect(() => {
    fetchTodos();
  }, []);

  //Runs on the first render
  //And any time any dependency value changes

  useEffect(() => {
  }, [count]);

  // const todos = [
  //   {
  //       id: 1,
  //       name: 'Read'
  //   },
 
  //   {
  //       id: 2,
  //       name: 'Cook'
  //   },
  //   {
  //       id: 3,
  //       name: 'Got to doctor'
  //   },
  //   {
  //       id: 4,
  //       name: 'Gym'
  //   }
  // ]

  const handleClick = () => {
    console.log("hello there")
  }

  return (
    <>
      
      <h1>React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Increment
        </button>
        {count}
        <button onClick={() => setCount((count) => count - 1)}>
          Decrement
        </button>

        {loading ? <div>Loading data</div> : todos.length ? todos.map((todo) => (
        <ListElement key={todo.id} todo={todo}/>
        )) : null} 

        <button onClick={handleClick}>Click me</button>

      </div>
      
    </>
  )
}

export default App
