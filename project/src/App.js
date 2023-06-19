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

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    case 'SET_NEW_TODO':
      return { ...state, newTodo: action.payload };
    case 'SET_EDIT_INDEX':
      return { ...state, editIndex: action.payload };
    case 'SET_COMPLETE_TODOS':
      return { ...state, completeTodos: action.payload };
    case 'TOGGLE_TODO':
      return { ...state, todos: state.todos.filter((_, index) => index !== action.payload) };
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
      dispatch({ type: 'SET_TODOS', payload: JSON.parse(storedTodos) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const handleCheckbox = (index) => {
    if (state.completeTodos.includes(index)) {
      dispatch({ type: 'SET_COMPLETE_TODOS', payload: state.completeTodos.filter((i) => i !== index) });
    } else {
      dispatch({ type: 'SET_COMPLETE_TODOS', payload: [...state.completeTodos, index] });
    }
  };

  const handleInputChange = (event) => {
    dispatch({ type: 'SET_NEW_TODO', payload: event.target.value });
  };

  const handleAddTodo = () => {
    if (state.newTodo.trim() !== '') {
      if (state.editIndex !== -1) {
        const updatedTodos = [...state.todos];
        updatedTodos[state.editIndex] = state.newTodo;
        dispatch({ type: 'SET_TODOS', payload: updatedTodos });
        dispatch({ type: 'SET_NEW_TODO', payload: '' });
        dispatch({ type: 'SET_EDIT_INDEX', payload: -1 });
      } else {
        const updatedTodos = [...state.todos, state.newTodo];
        dispatch({ type: 'SET_TODOS', payload: updatedTodos });
        dispatch({ type: 'SET_NEW_TODO', payload: '' });
      }
    }
  };

  const handleEditTodo = (index) => {
    dispatch({ type: 'SET_EDIT_INDEX', payload: index });
    dispatch({ type: 'SET_NEW_TODO', payload: state.todos[index] });
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...state.todos];
    updatedTodos.splice(index, 1);
    dispatch({ type: 'SET_TODOS', payload: updatedTodos });
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
