import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import Todo from './Todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

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
    <div className="App">
      <h1>React Todo APP</h1>

      <form>
        <FormControl>
          <InputLabel>Write a Todo: </InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />     
        </FormControl>

        <Button type="submit" onClick={addTodo} variant="contained" color="primary" disabled={!input}>Add Todo</Button>
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
