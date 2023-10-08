import React from 'react'
import { Typography, Grid, Box, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles';
import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';

const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    padding: '1rem'
  },
}));

export default function Task({ todo, handleUpdate, isLoading }) {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Typography>{todo?.task}</Typography>
      <Grid>
        {!todo?.completed && <IconButton onClick={() => handleUpdate(todo.id)} disabled={isLoading}><DoneIcon color="success" size={20} /></IconButton>}
        {todo?.completed && <IconButton onClick={() => handleUpdate(todo.id)} disabled={isLoading}><ReplayIcon color="warning" size={20} /></IconButton>}
      </Grid>
    </Box>
  )
}
