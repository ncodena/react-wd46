import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const NewUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    first_name: '',
    email: '',
    country: '',
  });
  const [countries, setCountries] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  // Fetch countries on component first mount to populate form selector
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:8000/countries');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchCountries();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  console.log(formData, 'formData')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users', formData);
      //Go back to users to check updated list after user creation
      navigate(`/users`)
    } catch (error) {
      console.error('Error creating user:', error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h2>Create new user</h2>
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
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
        />
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
        />
        <select name="country" value={formData.country} onChange={handleChange} required>
            <option value="">Select a country</option>
            {loading ? null : countries.length ? countries.map((country) => (
            <option key={country._id} value={country._id}>
                {country.name}
            </option>
            )): null}
        </select>
        <button type="submit">Submit</button>
    </form>
  );
};

export default NewUser;