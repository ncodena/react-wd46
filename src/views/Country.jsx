import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const Country = () => {

    const [country, setCountry] = useState({}); 
    const [loading, setLoading] = useState(true); 

    const navigate = useNavigate();
    const {code} = useParams();

    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/countries/${code}`);
          setCountry(response.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setLoading(false)
        }
      };
      
      useEffect(() => {
        fetchData();
      }, [code]);


  return (
    <>

        {loading ? (
                <p>Loading...</p>
        ) : (
            <div className='countryContainer'>
              <div className='buttonContainer'>
                <button onClick={() => navigate(-1)}>Go back to list of countries</button>
              </div>
                
                {Object.keys(country).length ? (
                  <>
                    <h3>{country.name}</h3>
                    <p>{country.alpha2Code}</p>
                    <p>{country.alpha3Code}</p>
                   </>
                ): null}
               
            </div>
        )}
    </>
  )
}

export default Country