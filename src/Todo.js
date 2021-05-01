import { Button, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import db from './firebase';
import './Todo.css';


const useStyles = makeStyles((theme) => ({
  todoList: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        fontSize: '1.7rem',
        margin: 'auto',
        boxShadow: theme.shadows[5],
    },
    todoListItem: {
      //boxShadow: theme.shadows[5],
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [checked, setChecked] = useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };

    const handleOpen = () => {
        setOpen(true);
      };

    const updateTodo = (event) => {
        event.preventDefault();
        // Update the todo with the new input item.
        db.collection('todos').doc(props.todo.id).set({
            todo: input,
        }, {merge: true});
        
        setInput('');
        setOpen(false);
    }

    const handleCheckbox =(value) => {
        console.log(value);
    }

    return (
        <>
        <Modal
            className={classes.modal}
            open={open}
            onClose={e => setOpen(false)}
            > 
                <div className={classes.paper}>
                    <h1>Edit your Todo item: </h1>
                    <form>
                        <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />   
                        <Button type="submit" onClick={updateTodo}>Update Todo</Button>
                    </form>
                </div>
            </Modal>
    
        <List classes={{root: classes.todoList}}>

            <ListItem 
              key={props.todo.id} 
              role={undefined} 
              button 
              onClick={handleToggle(props.todo.id)} 
              classes={{root: classes.todoListItem}}
              >

              <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(props.todo.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
              </ListItemIcon>
              
              <ListItemText id={props.todo.id} primary={props.todo.todo} disableTypography/>

              <ListItemSecondaryAction>
                <IconButton size="large" aria-label="edit" onClick={e => setOpen(true)}>
                  <EditIcon />
                </IconButton>
              
                <IconButton aria-label="delete" onClick={event => db.collection('todos').doc(props.todo.id).delete()}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>

            </ListItem>

        </List>
      </>
    )
}

export default Todo
