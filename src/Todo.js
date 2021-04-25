import { Button, Checkbox, List, ListItem, ListItemIcon, ListItemText, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, { useState } from 'react';
import db from './firebase';
import './Todo.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
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
    const [checked, setChecked] = React.useState([0]);

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
    
    <List className={classes.root}>
            
            <ListItem key={props.todo.id} role={undefined} dense button onClick={handleToggle(props.todo.id)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(props.todo.id) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText id={props.todo.id} primary={props.todo.todo} />
            
            <button onClick={e => setOpen(true)}>Edit</button>
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
            </ListItem>
        
        </List>

        </>
    )
}

export default Todo
