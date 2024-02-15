import React, { useState } from 'react';
import axios from 'axios';

const NewCountry = () => {
  const [formData, setFormData] = useState({
    name: '',
    alpha2Code: '',
    alpha3Code: '',
  });
  const [loading, setLoading] = useState(false); 
  const [country, setCountry] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    setLoading(true)
        const response = await axios.post('http://localhost:8000/countries', formData);
        setCountry(response.data);
    } catch (error) {
        console.error('Error creating user:', error.response.data.message);
    } finally {
        setLoading(false)
    }
  };

  return (
    <>
        <form onSubmit={handleSubmit}>
                <h2>Create new country</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="alpha2Code"
                    placeholder="Alpha2Code"
                    value={formData.alpha2Code}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="alpha3Code"
                    placeholder="Alpha3Code"
                    value={formData.alpha3Code}
                    onChange={handleChange}
                    required
                />
                <button disabled={loading} type="submit">Submit</button>
        </form>
        {Object.keys(country).length ? (
            <div key={country._id} className='userContainer'>
                <h3>Name: {country.name}</h3>
                <h4>Alpha2Code: {country.alpha2Code}</h4>
                <h4>Alpha3Code: {country.alpha3Code}</h4>
            </div>
        ) : null }
    </>
    
  );
};

export default NewCountry;