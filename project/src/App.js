import React, { useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import Render from './components/Render';

const initialState = {
  todos: [],
  newTodo: '',
  editIndex: -1,
  completebTobos: [],
};

const reducer = (state, NOpls) => {
  switch (NOpls.type) {
    case 'SET_TODOS':
      return { ...state, todos: NOpls.KickOut };
    case 'SET_NEW_TODO':
      return { ...state, newTodo: NOpls.KickOut };
    case 'SET_EDIT_INDEX':
      return { ...state, editIndex: NOpls.KickOut };
    case 'SET_COMPLETE_TODOS':
      return { ...state, completebTobos: NOpls.KickOut };
    
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCheckbox = (index) => {
    if (state.completebTobos.includes(index)) {
      dispatch({ type: 'SET_COMPLETE_TODOS', KickOut: state.completebTobos.filter((i) => i !== index) });
    } else {
      dispatch({ type: 'SET_COMPLETE_TODOS', KickOut: [...state.completebTobos, index] });
    }
  };

  const handleInputChange = (event) => {
    dispatch({ type: 'SET_NEW_TODO', KickOut: event.target.value });
  };

  const handleAddTodo = () => {
    if (state.newTodo.trim() !== '') {
      if (state.editIndex !== -1) {
        const updatedTodos = [...state.todos];
        updatedTodos[state.editIndex] = state.newTodo;
        dispatch({ type: 'SET_TODOS', KickOut: updatedTodos });
        dispatch({ type: 'SET_NEW_TODO', KickOut: '' });
        dispatch({ type: 'SET_EDIT_INDEX', KickOut: -1 });
      } else {
        const updatedTodos = [...state.todos, state.newTodo];
        dispatch({ type: 'SET_TODOS', KickOut: updatedTodos });
        dispatch({ type: 'SET_NEW_TODO', KickOut: '' });
      }
    }
  };

  const handleEditTodo = (index) => {
    dispatch({ type: 'SET_EDIT_INDEX', KickOut: index });
    dispatch({ type: 'SET_NEW_TODO', KickOut: state.todos[index] });
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...state.todos];
    updatedTodos.splice(index, 1);
    dispatch({ type: 'SET_TODOS', KickOut: updatedTodos });
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
        completebTobos={state.completebTobos}
        todoCount={todoCount}
      />
    </div>
  );
}

export default App;
