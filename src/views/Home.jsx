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
          .then((data) => setJokes(data.jokes))
          .catch((error) => console.log(error))
          .finally(() => {
            setLoading(false)
          })
        };
      
        fetchJokes();
      }, []);

      const renderJoke = (joke) => {
        if (joke.type === 'twopart') {
            return <p><b>{joke.setup}</b><br/>{joke.delivery}</p>;
        } else {
            return <p>{joke.joke}</p>;
        }
    };

  return (
    <div>
    <h1>Jokes</h1>
    {loading ? (
        <p>Loading jokes...</p>
    ) : (
        <ul>
        {jokes.length ? jokes.map((joke, index) => (
            <div key={index}>{renderJoke(joke)}</div>
        )) : null}
        </ul>
    )}
</div>
  )
}

export default Home