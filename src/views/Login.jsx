import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const {login, user} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData, setLoading, setError)
  };

  return (
    <>
      {error ? <p>Error: {error}</p> :(
        <>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
              type="email"
              name="email"
              placeholder="Insert your email"
              value={formData.email}
              onChange={handleChange}
              required
          />
          <input
              type="password"
              name="password"
              placeholder="Insert your password"
              value={formData.password}
              onChange={handleChange}
              required
          />
          <button disabled={loading} type="submit">Submit</button>
        </form>
        {user ? <p>Welcome {user.name}</p> : null}
        </>
      )}
    </>
    
  );
};

export default Login;