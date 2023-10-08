import React from 'react';
import { SnackbarContent, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  snackbar: {
    minWidth: '50px'
  },
  snackbarContent: {
    minWidth: '50px',
    justifyContent: 'center'
  }
}));

const CustomizableSnackbar = (props) => {
  const { message, snackbarOpen, setSnackbarOpen } = props;
  const classes = useStyles();

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} className={classes.snackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <SnackbarContent className={classes.snackbarContent} message={<span>{message}</span>} />
    </Snackbar>
  );
};

export default CustomizableSnackbar;
