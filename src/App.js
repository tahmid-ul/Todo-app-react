import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import Todo from './Todo';

const AddTodoButton = withStyles({
  root: {
    background: 'linear-gradient(to right, rgba(40, 180, 133, 0.8), rgba(126, 213, 111, 0.8))',
    borderRadius: '2rem',
    border: 0,
    color: 'white',
    padding: '1rem 2.5rem',
    boxShadow: '0 0.5rem 0.5rem rgb(0 0 0 / 20%)',
    marginLeft: '1.5rem',
    transition: 'all 0.3s linear',
    '&:disabled': {
      background: 'var(--color-grey-light)',
      boxShadow: 'none',
      color: 'var(--color-gray)',
    },
    '&:hover': { 
      transform: 'translateY(-2px)',
      boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 20%)',
    },
    '&:active, &:focus': {
      outline: 'none',
      transform: 'translateY(-1px)',
      boxShadow: '0 .5rem 1rem rgba(0 0 0 ,.2)',
    },
    
  },
  label: {
    fontSize: '1.5rem',
  },
})(Button);


function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //const classes = useStyles();

  // When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);

  const addTodo = (event) => {
    // This will fire when we click the add todo button
    event.preventDefault();

    // Add the Todo to the firestore DB
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    
    setInput('');
  }

  return (
    <div className="Todo__app">
      
      <h1>React Todo APP</h1>
      
      <div className="Todo__app--header">
        <form className="Todo__form">
          <FormControl className="Todo__form--input-container">
            <InputLabel>Write a Todo: </InputLabel>
            <Input value={input} onChange={event => setInput(event.target.value)} className="Todo__form--input" />     
          </FormControl>

          <AddTodoButton 
          type="submit" 
          onClick={addTodo} 
          disabled={!input} 
          >Add Todo</AddTodoButton>
        </form>
      </div>
      
      <div className="Todo__app--body">
        <ul>
          {todos.map(todo => (
            <Todo todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
