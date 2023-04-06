import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage () {
  const navigate = useNavigate();
  return (
        <>
            <h1>Register Page</h1>
            <Button variant="contained" onClick={() => { navigate('/') }}>Back to Home</Button>
        </>
  );
}
