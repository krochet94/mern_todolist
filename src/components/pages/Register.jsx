import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { TextField, Typography, Paper, Button, InputAdornment, IconButton, InputLabel, OutlinedInput, FormControl, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomizableSnackbar from '../layout/snackbar';

const useStyles = makeStyles(() => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh',
		width: '100vw',
		backgroundColor: 'whitesmoke'
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '1.5rem',
		padding: '3rem',
		minWidth: '300px',
		margin: 'auto',
	}
}));

export default function Register() {
	const classes = useStyles();
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleRegister = async () => {
		if (!username || !password || !rePassword) {
			setSnackbarMessage('Please fill in all fields.');
			setSnackbarOpen(true);
			return;
		}
		if (password !== rePassword) {
			setSnackbarMessage('Passwords do not match.');
			setSnackbarOpen(true);
			return;
		}

		try {
			setIsLoading(true);
			const res = await fetch('http://localhost:4000/register', {
				method: 'POST',
				headers: { "Content-Type": "application/json"	},
				body: JSON.stringify({ username, password })
			});
			const response = await res.json();
			if (!res.ok) throw Error(response?.message);
			navigate('/');
			window.alert('Registration successful. After redirecting to the home page, please login.');
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
			<Typography variant="h4">Register</Typography>
				<TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" fullWidth />
				<FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
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
				<FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password2">Re-type Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password2" type={passwordVisible ? 'text' : 'password'}
						placeholder="Re-type Password" value={rePassword} onChange={(e) => setRePassword(e.target.value)}
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
				<Button variant="contained" onClick={handleRegister} disabled={!username || !password || !rePassword} fullWidth>{isLoading ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Register'}</Button>
				<Button variant="outlined" disabled={isLoading} onClick={() => navigate('/')} fullWidth>Return Home</Button>
			</Paper>
			<CustomizableSnackbar message={snackbarMessage} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} />
    </div>
  )
}
