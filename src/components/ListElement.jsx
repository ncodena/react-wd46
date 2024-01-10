import React from 'react'

const ListElement = ({todo}) => {

    const handleClick = (todo) => {
        console.log(`${todo} clicked`)
    }
  return (
    <button onClick={() => handleClick(todo.title)}>{todo.title}</button>
  )
}

export default ListElement