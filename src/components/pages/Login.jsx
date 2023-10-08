import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { TextField, Typography, Paper, Button, InputAdornment, IconButton, InputLabel, OutlinedInput, FormControl, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomizableSnackbar from '../layout/snackbar';
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
		gap: '1rem',
		padding: '3rem',
		maxWidth: '80vw',
		minWidth: '20vw',
		margin: 'auto'
	}
}));

export default function Login() {
const classes = useStyles();
const navigate = useNavigate();
const { setCredentials } = useContext(AuthContext);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [passwordVisible, setPasswordVisible] = useState(false);
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [isLoading, setIsLoading] = useState(false);

const handleLogin = async () => {
	if (!username || !password) {
		setSnackbarMessage('Please fill in all fields.');
		setSnackbarOpen(true);
		return;
	}

	try {
		setIsLoading(true);
		const res = await fetch('http://localhost:4000/login', {
			method: 'POST',
			headers: { "Content-Type": "application/json"	},
			body: JSON.stringify({ username, password })
		});
    const response = await res.json();
    if (!res.ok) throw Error(response?.message);
		setCredentials({ username, password });
		window.localStorage.setItem("credentials", JSON.stringify({ username, password }));
    navigate('/todos');
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
			<Paper className={classes.paper} >
			<Typography variant="h4">Login</Typography>
				<TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
				<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password1">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password1" type={passwordVisible ? 'text' : 'password'}
						placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
				<Button variant="contained" onClick={handleLogin} disabled={!username || !password}>{isLoading ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Login'}</Button>
				<Button variant="outlined" disabled={isLoading} onClick={() => navigate('/')}>Home</Button>
			</Paper>
			<CustomizableSnackbar message={snackbarMessage} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} />
    </div>
  )
}
