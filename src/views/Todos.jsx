import React, {useEffect, useState} from 'react'
import axios from 'axios';
import ListElement from '../components/ListElement';
import { useNavigate } from 'react-router-dom';

const Todos = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]); 
    const [loading, setLoading] = useState(true); 

    // const fetchTodos = async () => {
    //     try {
    //       const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    //       setTodos(response.data);
    //       console.log(response)
    //     } catch (error) {
    //       console.error("Error fetching data: ", error);
    //     } finally {
    //       setLoading(false)
    //     }
    //   };
      
    //   useEffect(() => {
    //     fetchTodos();
    //   }, []);

    const fetchTodos = async (ids) => {
        try {
          const fetchPromises = ids.map(id =>
            fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
              .then(response => response.json())
            );
          const results = await Promise.all(fetchPromises);
          setTodos(results)  
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setLoading(false)
        }
      };
      
      useEffect(() => {
        fetchTodos([7, 8, 9, 10, 11]);
      }, []);

  return (
    <>
    <h1>Todos</h1>
    {loading ? <div>Loading data</div> : todos.length ? todos.map((todo) => (
        <button key={todo.id} onClick={() => navigate(`${todo.id}`)}>
            <ListElement key={todo.id} todo={todo}/>
        </button>
       
      )) : null}  </>
  )
}

export default Todos