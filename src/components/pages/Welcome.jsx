import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { Typography, Paper, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AuthContext } from '../../auth-context';

const useStyles = makeStyles(() => ({
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
  buttonContainer:{
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%'
  }
}));

export default function Welcome() {
  const { credentials } = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();
  
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4">
          Todo App with Authentication Using MERN Stack'
        </Typography>
        {!credentials?.username && (
          <div className={classes.buttonContainer}>
            <Button variant="text" onClick={() => navigate('/register')}>Register</Button>
            <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
          </div>
        )}
        {credentials?.username && <Button variant="contained" onClick={() => navigate('/todos')}>Go to Todos</Button>}
      </Paper>
    </div>
  )
}
