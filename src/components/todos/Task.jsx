import React from 'react'
import { Typography, Grid, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles';
import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';

const useStyles = makeStyles(() => ({
  gridContainer: {
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
    <Grid className={classes.gridContainer}>
      <Grid item xs={9} zeroMinWidth>
        <Typography>{todo?.task}</Typography>
      </Grid>
      <Grid item xs={3}>
        {!todo?.completed && <IconButton onClick={() => handleUpdate(todo.id)} disabled={isLoading}><DoneIcon color="success" size={20} /></IconButton>}
        {todo?.completed && <IconButton onClick={() => handleUpdate(todo.id)} disabled={isLoading}><ReplayIcon color="warning" size={20} /></IconButton>}
      </Grid>
    </Grid>
  )
}
