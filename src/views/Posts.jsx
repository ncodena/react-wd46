import React from 'react';
import { useEffect, useState } from 'react';
 
const Posts = () => {
const [data, setData] = useState([]);
const [titleValue, setTitleValue] = useState("");
const [bodyValue, setBodyValue] = useState("");
const [userIDValue, setUserIDValue] = useState("");

const [isLoadingPosts, setIsLoadingPosts] = useState(true);
// New state to control loading request when submitting POST REQUEST
const [isSubmittingPost, setIsSubmittingPost] = useState(false);


useEffect(() => {
        
    const fetchJokes = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if(!response.ok){
                throw new Error('THE FETCH FAILED with status' + response.status)
            }
            console.log(response)
            const data = await response.json();
            setData(data)
        } catch(error){
            console.log('Error fetching data', error)
        } finally {
            setIsLoadingPosts(false)
        }
      
    };
  
    fetchJokes();
  }, []);

  const sendForm = async (event) => {
    event.preventDefault();
    const dataToSend = {
        title: titleValue,
        body: bodyValue,
        userId: userIDValue,
    }

    try{
        // Set to true when POST request is fired
        setIsSubmittingPost(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(dataToSend)
        });

        const data = await response.json();
        setData(prevData => [...prevData, data])

    } catch(error){
        alert(`Error: ${error}`);
    } finally{
      // Loading set to false when POST request is either resolved or rejected and cleaning input values so the form gets empty and ready to be filled again

      setIsSubmittingPost(false);
      setTitleValue("")
      setBodyValue("");
      setUserIDValue("");
    }

  }


  return (
    <div>
        <h1>JSON PLACEHOLDER POSTS</h1>
        {isLoadingPosts ? <p>Loading posts...</p> : data.map(post => (
        <div key={post.id}>
            <p>ID: {post.id}</p>
            <p>Title: {post.title}</p>
            <p>Body: {post.body}</p>
        </div>
      ))}
 
        <form onSubmit={sendForm}>
            <h2>Insert a new post</h2>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              name="title"
              value={titleValue}
              placeholder="Enter Title"
              onChange={(event) => setTitleValue(event.target.value)}
              required
            ></input>
            <br />
            <label htmlFor="body">Body: </label>
            <input
              type="text"
              id="body"
              name="body"
              value={bodyValue}
              placeholder="Enter Body"
              onChange={(event) => setBodyValue(event.target.value)}
              required
            ></input>
            <br />
            <label htmlFor="userID">User ID: </label>
            <input
              type="number"
              id="userID"
              name="userID"
              value={userIDValue}
              placeholder="Enter User ID"
              onChange={(event) => setUserIDValue(event.target.value)}
              required
            ></input>
            <br />
            {/* Disable button to prevent multiple submits when the request is being processed and also changing button content text */}
            <button value="submit" disabled={isSubmittingPost}>
              {isSubmittingPost ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    </div>
  )
}
 
export default Posts