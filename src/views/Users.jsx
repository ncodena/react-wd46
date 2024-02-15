import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Users = () => {
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();


    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/users');
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setLoading(false)
        }
      };
      
      useEffect(() => {
        fetchData();
      }, []);

  return (
    <>
    <h1>List of users</h1>
    <div className='buttonContainer'>
      <button onClick={() => navigate(`new_user`)}>
          Create new user
      </button>
    </div>
    <div className='usersContainer'>
    {loading ? <div>Loading data</div> : users.length ? users.map((user) => (
        <div key={user._id} className='userContainer'>
            <h3>Name: {user.name}</h3>
            <h4>First name: {user.first_name}</h4>
            <h4>Email: {user.email}</h4>
            {user.country ? <h4>Country: {user.country.name}</h4> : null}
        </div>
       
      )) : null}
      </div> </>
  )
}

export default Users