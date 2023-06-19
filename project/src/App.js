import React, { useReducer, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Render from './components/Render';

const initialState = {
  todos: [],
  newTodo: '',
  editIndex: -1,
  completeTodos: [],
};

const reducer = (state, NOpls) => {
  switch (NOpls.type) {
    case 'TODOS':
      return { ...state, todos: NOpls.LayOut };
    case 'NEWTODO':
      return { ...state, newTodo: NOpls.LayOut };
    case 'EDITINDEX':
      return { ...state, editIndex: NOpls.LayOut };
    case 'COMPLETETODOS':
      return { ...state, completeTodos: NOpls.LayOut };
    case 'TOGGLETODO':
      return { ...state, todos: state.todos.filter((_, index) => index !== NOpls.LayOut) };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      dispatch({ type: 'TODOS', LayOut: JSON.parse(storedTodos) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const handleCheckbox = (index) => {
    if (state.completeTodos.includes(index)) {
      dispatch({ type: 'COMPLETETODOS', LayOut: state.completeTodos.filter((i) => i !== index) });
    } else {
      dispatch({ type: 'COMPLETETODOS', LayOut: [...state.completeTodos, index] });
    }
  };

  const handleInputChange = (event) => {
    dispatch({ type: 'NEWTODO', LayOut: event.target.value });
  };

  const handleAddTodo = () => {
    if (state.newTodo.trim() !== '') {
      if (state.editIndex !== -1) {
        const updatedTodos = [...state.todos];
        updatedTodos[state.editIndex] = state.newTodo;
        dispatch({ type: 'TODOS', LayOut: updatedTodos });
        dispatch({ type: 'NEWTODO', LayOut: '' });
        dispatch({ type: 'EDITINDEX', LayOut: -1 });
      } else {
        const updatedTodos = [...state.todos, state.newTodo];
        dispatch({ type: 'TODOS', LayOut: updatedTodos });
        dispatch({ type: 'NEWTODO', LayOut: '' });
      }
    }
  };

  const handleEditTodo = (index) => {
    dispatch({ type: 'EDITINDEX', LayOut: index });
    dispatch({ type: 'NEWTODO', LayOut: state.todos[index] });
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...state.todos];
    updatedTodos.splice(index, 1);
    dispatch({ type: 'TODOS', LayOut: updatedTodos });
  };

  const todoCount = state.todos.length;

  return (
    <div className="App">
      <Header
        handleAddTodo={handleAddTodo}
        handleInputChange={handleInputChange}
        newTodo={state.newTodo}
        editIndex={state.editIndex}
      />
      <Render
        todos={state.todos}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
        handleCheckbox={handleCheckbox}
        completeTodos={state.completeTodos}
        todoCount={todoCount}
      />
    </div>
  );
}

export default App;
