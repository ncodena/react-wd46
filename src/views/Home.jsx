import React, { useState, useEffect } from 'react';

const Home = () => {
  //Simple Functions
  //A simple (or regular) function in JavaScript is a set of statements that performs a task or calculates a value.

  const square = (number) => {
    return number * number;
  }
  
  //console.log(square(4));

  // Callback Functions
  // Definition: A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.
  //Usage: Callbacks are used for asynchronous operations, such as in event listeners, timers, or making HTTP requests. They're also used in array methods.

  const greeting = (name) => {
    alert('Hello ' + name);
  }

  const greetingNúria = () => {
    alert('Hello Núria');
  }
  
  // const processUserInput = (callback) => {
  //   const name = prompt('Please enter your name.');
  //   callback(name);
  // }
  
  // processUserInput(greeting);

  //Map

  const numbers = [1, 4, 5];

  const doubles = numbers.map(number => number * 2)
  console.log(numbers)
  console.log(doubles)

  const numbersToFilter = [1,2, 3, 4];

  const evens = numbersToFilter.filter(number => number > 2)

  console.log(evens)

  const findNumberArray = numbersToFilter.find(number => number > 2);
  console.log(findNumberArray)



  return (
    <div>
        <h1>Jokes API</h1>
        <button onClick={() => greeting("Subaru") }>Click me</button>
        <button onClick={greetingNúria}>Click me Núria</button>
    </div>
  )
}

export default Home