/* eslint-disable react-hooks/exhaustive-deps */  
import React, { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Typography, Grid, Button, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { makeStyles } from '@mui/styles';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../auth-context';
import Task from './Task';
import CustomizableSnackbar from '../layout/snackbar';
import Loading from '../layout/loading';

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
	},
  selection: {
    width: '50%',
    margin: '30px 0px'
  },
}));

export default function Todos() {
  const classes = useStyles();
  const navigate = useNavigate();
  const isMounted = useRef(false);
  const { credentials } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [addTask, setAddTask] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  const handleAddTask = async () => {
    if (!addTask) return;
    const newTodos = [...todos, { task: addTask, completed: false, id: uuidv4() }];
    await handlePersist(newTodos, true);
  };
  
  const handleUpdate = async (id) => {
    const newTodos = JSON.parse(JSON.stringify(todos));
    const todoItem = newTodos.find((todo) => todo.id === id);
    todoItem.completed = !todoItem.completed;
    await handlePersist(newTodos);
  };

  const handlePersist = async (newTodos, add) => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:4000/todos', {
        method: 'POST',
        headers: {
         "Content-Type": "application/json",
         "Authorization": `Basic ${credentials.username}:${credentials.password}`
         },
        body: JSON.stringify(newTodos)
      });
      const response = await res.json();
      if (!res.ok) throw Error(response?.message);
      setTodos(newTodos);
      if (add) setAddTask('');
    } catch (error) {
      console.log(error.message);
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:4000/todos', {
          method: 'GET',
          headers: {
           "Content-Type": "application/json",
           "Authorization": `Basic ${credentials.username}:${credentials.password}`
           }
        });
        const response = await res.json();
        if (!res.ok) throw Error(response?.message);
        if (isMounted.current) setTodos(response || []);
      } catch (error) {
        console.log(error.message);
        if (isMounted.current) {
          setSnackbarMessage(error.message);
          setSnackbarOpen(true);
        }
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
          setInitialLoading(false);
        }
      }
    };
    fetchTodos();
    return () => {
      isMounted.current = false;
    }
  }, []);

  if (initialLoading && isLoading) return <Loading />;
  else {
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
          <FormControl className={classes.selection}>
            <InputLabel id="selectLabel">Filter</InputLabel>
            <Select fullWidth value={completed} labelId="selectLabel" label="Filter" onChange={(e) => setCompleted(e.target.value)}>
              <MenuItem value={false}>
                Unfinished
              </MenuItem>
              <MenuItem value={true}>
                Finished
              </MenuItem>
            </Select>
          </FormControl>
          <div className={classes.taskContainer}>
            {todos.filter((todo) => completed ? todo.completed : !todo.completed).map((todo, index) => <Task todo={todo} key={todo.id || index} handleUpdate={handleUpdate} isLoading={isLoading} />)} 
          </div>
          <Button variant="contained" onClick={() => navigate('/')}>Home</Button>
        </Paper>
        <CustomizableSnackbar message={snackbarMessage} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} />
      </div>
    )
  }
}
