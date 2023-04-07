import React from 'react';
import { Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage () {
  const navigate = useNavigate();

  return (
        <>
            <h1>Login Page</h1>
            <Link to="/register">Don&apos;t Have an account?</Link>
            <br />
            <br />
            <Button variant="contained" onClick={() => { navigate('/') }}>Back to Home</Button>
        </>
  );
}
