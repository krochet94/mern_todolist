import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Typography, Grid, Button, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { AuthContext } from '../../auth-context';
import Task from './Task';
import CustomizableSnackbar from '../layout/snackbar';

const useStyles = makeStyles(() => ({
  addTaskContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%'
  },
  taskContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '2rem',
    width: '100%'
  },
  container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		width: '100vw',
    backgroundColor: 'whitesmoke'
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '3rem',
		padding: '5rem',
		maxWidth: '80vw',
		minWidth: '20vw',
		margin: 'auto'
	}
}));

export default function Todos() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { credentials } = useContext(AuthContext);
  const [todos, setTodos] = useState([{ task: 'code', completed: false }, { task: 'sleep', completed: true }]);
  const [addTask, setAddTask] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = async () => {
    if (!addTask) return;
    const newTodos = [...todos, { task: addTask, completed: false }];
    await handlePersist(newTodos);
  };
  
  const handleUpdate = async (index) => {
    const newTodos = JSON.parse(JSON.stringify(todos));
    newTodos[index].completed = !newTodos[index].completed;
    await handlePersist(newTodos);
  };

  const handlePersist = async (newTodos) => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:4000/todos', {
        method: 'POST',
        headers: {
         "Content-Type": "application/json",
         "Authorization": `Basic ${credentials.username}:${credentials.password}`
         },
        body: JSON.stringify({ newTodos })
      });
      const response = await res.json();
      if (!res.ok) throw Error(response?.message);
      setTodos(newTodos);
    } catch (error) {
      console.log(error.message);
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4">
          Hi {credentials.username} <WavingHandIcon size={20} />
        </Typography>
        <Grid container className={classes.addTaskContainer}>
          <TextField label="Add Task" value={addTask} placeholder="Add Task" onChange={(e) => setAddTask(e.target.value)} />
          <Button color="success" variant="contained" disabled={!addTask} onClick={handleAddTask}>Add</Button>
        </Grid>
        <div className={classes.taskContainer}>
          {todos.map((todo, index) => <Task todo={{ ...todo, index }} key={index} handleUpdate={handleUpdate} isLoading={isLoading} />)} 
        </div>
        <Button variant="contained" onClick={() => navigate('/')}>Home</Button>
      </Paper>
      <CustomizableSnackbar message={snackbarMessage} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} />
    </div>
  )
}
