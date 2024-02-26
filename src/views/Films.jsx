import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import axios from 'axios';


const Films = () => {
    const {token} = useAuth();

    const [films, setFilms] = useState([]);
    const [formData, setFormData] = useState({
        name: null,
        genre: null,
        year: null,
        img: null
    });
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'img' ? e.target.files[0] : value,
          }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        //FormData is a web API available in modern browsers that provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be sent using an AJAX request. It is especially useful for forms that include file uploads.
        const newFormData = new FormData();
        //We use .append() method to add fields to the FormData object. The first argument is the name of the field (this should match the name expected by the server), and the second argument is the value of that field.
        newFormData.append('img', formData.img);
        newFormData.append('name', formData.name);
        newFormData.append('year', formData.year);
        newFormData.append('genre', formData.genre);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/films`, newFormData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    //multipart/form-data encoding type, which is used for form submissions that include files, is supported by FormData. This encoding type is necessary for correctly transmitting files from the client to the server. 
                    //Important => Traditional JSON, sent with a Content-Type of application/json, cannot contain files.
                    'Content-Type': 'multipart/form-data',
                },
            });
            //Automatically updating list of films after new film creation
            setFilms([...films, response.data]);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    useEffect(() => {
        const fetchFilms = async () => {
          
          try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/films`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            setFilms(response.data);
          } catch (err) {
            setError(err);
          }finally{
            setLoading(false);
          }
        };
        fetchFilms();
      }, []); 

  return (
    <>
      {error ? <p>Error: {error}</p> :(
        <>
          {loading ? <div>loading</div> : films.length ? films.map((film) => (
        <div key={film._id}>
          <h2>{film.name}</h2>
          {/* we simply return img property containing cloudinary url which contains our uploades image stored */}
          {film.img ? <img src={film.img} alt={film.name} width={200}/> : <div>No image</div>}
          <p>{film.genre}</p>
          <p>{film.year}</p>
        </div>
      )): null}
        <form onSubmit={submitHandler}>
          <h2>Create new film</h2>
            <input
                type="text"
                name="name"
                placeholder="Insert a name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="genre"
                placeholder="Insert a genre"
                value={formData.genre}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="year"
                placeholder="Insert a year"
                value={formData.year}
                onChange={handleChange}
                required
            />
            <input name="img" type="file" onChange={handleChange} />
            <button disabled={loading} type="submit">Submit</button>
        </form>
        </>
      )}
    </>
  )
}

export default Films