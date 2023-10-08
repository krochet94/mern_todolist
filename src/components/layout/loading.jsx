import React from 'react';
import { Grid, Container, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Container maxWidth="md">
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '80vh' }}>
        <CircularProgress />
      </Grid>
    </Container>
  );
};

