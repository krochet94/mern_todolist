import React, { useContext } from 'react';
import { Typography, Link } from '@mui/material';
import { AuthContext } from '../auth-context';

export default function Welcome() {
  const {credentials} = useContext(AuthContext);
  return (
    <div>
      <Typography variant="h4">
        Welcome{credentials?.username && ` ${credentials?.username}`}
      </Typography>
      {Object.keys(credentials).length === 0 && <Link href="/register">Register</Link>}
      <br />
      {Object.keys(credentials).length === 0 && <Link href="/login">Login</Link>}
    </div>
  )
}
