import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function DashBoard () {
  const navigate = useNavigate();
  return (
    <>
      <h1>DashBoard</h1>
      <Button variant="contained" onClick={() => { navigate('/') }}>Back to Home</Button>
    </>
  );
}
