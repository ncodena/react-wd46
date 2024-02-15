import React, {useEffect, useState} from 'react'
import axios from 'axios';
import ListElement from '../components/ListElement';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Countries = () => {
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    const {token} = useAuth();

    const fetchData = async () => {
        try {

          const config = {
            headers: {
              'Authorization': token ? `Bearer ${token}` : null,
            }
          };
        
          const response = await axios.get('http://localhost:8000/countries', config);
          setCountries(response.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
          setError(error.response.data)
        } finally {
          setLoading(false)
        }
      };
      
      useEffect(() => {
        fetchData();
      }, []);

  return (
    <>
    <h1>Countries</h1>
    
    <div className='buttonContainer'>
      <button onClick={() => navigate(`new_country`)}>
          Create new country
      </button>
    </div>
      <div className='usersContainer'>
        {loading ? <div>Loading data</div> : error ? <div>{error}</div> : countries.length ? countries.map((country) => (
            <button key={country._id} onClick={() => navigate(`${country.alpha3Code}`)}>
              <ListElement key={country.alpha3Code} country={country}/>
            </button>
        )) : null}
      </div>  
    </>
  )
}

export default Countries