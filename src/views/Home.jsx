import React, { useState, useEffect } from 'react';

const Home = () => {

    const [jokes, setJokes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        
        const fetchJokes = () => {
            
          fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit&amount=10')
          .then((response) => {
            
            if(!response.ok){
                throw new Error('THE FETCH FAILED')
            }

            return response.json()
          })
          .then((data) => setJokes(data))
          .catch((error) => console.log(error))
          .finally(() => {
            setLoading(false)
          })
        };
      
        fetchJokes();
      }, []);

 

  return (
    <div>
        <h1>Jokes API</h1>
    </div>
  )
}

export default Home