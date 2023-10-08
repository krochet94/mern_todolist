import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Typography, Paper, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AuthContext } from '../../auth-context';
import CustomizableSnackbar from '../layout/snackbar';

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
		padding: '4rem',
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
  const { credentials, setCredentials } = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const logout = () => {
    window.localStorage.clear();
    setCredentials({});
    setSnackbarOpen(true);
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4">
          Todo App with Authentication Using MERN Stack
        </Typography>
        {!credentials?.username && (
          <div className={classes.buttonContainer}>
            <Button variant="outlined" onClick={() => navigate('/register')}>Register</Button>
            <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
          </div>
        )}
         {credentials?.username && (
          <div className={classes.buttonContainer}>
            <Button variant="outlined" onClick={() => navigate('/todos')}>Go to Todos</Button>
            <Button variant="contained" onClick={logout} color="error">Logout</Button>
          </div>
        )}
      </Paper>
      <CustomizableSnackbar message="Logged out" snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} />
    </div>
  )
}
