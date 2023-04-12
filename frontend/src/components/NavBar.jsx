import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { Context, useContext } from '../authContext';
import PrimaryButton from './PrimaryButton'
import axios from '../axios';

export default function NavBar () {
  const navigate = useNavigate();
  const { authToken, setAuthToken } = useContext(Context);

  const logout = () => {
    axios
      .post('/admin/auth/logout', {}, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(response => {
        localStorage.removeItem('token');
        setAuthToken('');
        navigate('/');
      })
      .catch(err => console.log(err));
  };
  return (
    <>
        <AppBar position="relative" color="primary" enableColorOnDark style={ { minWidth: '100vw', background: 'linear-gradient(203deg, rgba(207,136,255,1) 4%, rgba(255,99,99,1) 73%, rgba(255,200,123,1) 100%)' } }>
            <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={navigate('/')}>
                      BigBrain!
                  </IconButton>
                  <Link to="/" style={{ color: 'white' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={navigate('/')}>
                      <Typography>Home</Typography>
                    </IconButton>
                  </Link>
                </div>
                <PrimaryButton onClick={logout}>Log Out</PrimaryButton>
            </Toolbar>
        </AppBar>
    </>
  );
}
