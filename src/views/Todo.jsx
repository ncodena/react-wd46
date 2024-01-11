import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const Todo = () => {

    const [todo, setTodo] = useState({}); 
    const [loading, setLoading] = useState(true); 

    const navigate = useNavigate();
    const {id} = useParams();

    console.log(id, 'urlId')

    const fetchTodos = async () => {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
          setTodo(response.data);
          ///console.log(response)
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setLoading(false)
        }
      };
      
      useEffect(() => {
        fetchTodos();
      }, [id]);


  return (
    <>

        {loading ? (
                <p>Loading...</p>
        ) : (
            <div>
                <button onClick={() => navigate(-1)}>Go back to todos</button>
                <h3>{todo.title}</h3>
                <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
            </div>
        )}
    </>
  )
}

export default Todo