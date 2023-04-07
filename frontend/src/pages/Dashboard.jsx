import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Context, useContext } from '../authContext';

export default function DashBoard () {
  const navigate = useNavigate();
  const { authToken, setAuthToken } = useContext(Context);
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken('');
    navigate('/');
  }
  return (
    <>
      <h1>DashBoard</h1>
      <h2>Token: {authToken}</h2>
      <Button variant="contained" onClick={() => { navigate('/') }}>Back to Home</Button>
      <Button variant="outlined" onClick={ logout }> Log Out </Button>
    </>
  );
}
