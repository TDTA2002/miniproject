import React from 'react'

export default function render({ todos, handleDeleteTodo, handleEditTodo, completebTobos, handleCheckbox, todoCount }) {


  return (
    <>
      <div>You have {todoCount} tasks to complete!</div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ textDecoration: completebTobos?.includes(index) ? 'line-through' : 'none' }}>
            <input type="checkbox" onClick={() => handleCheckbox(index)} />
            {todo}
            <button onClick={() => handleEditTodo(index)}>Edit</button>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

