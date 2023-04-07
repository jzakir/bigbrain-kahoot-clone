import React from 'react';
import { Button, Container, Box } from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';

const boxStyle = {
  backgroundColor: '#FFFFFF',
  marginTop: '20px',
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '2px'
};

export default function LoginRegisterLayout () {
  const navigate = useNavigate();

  return (
        <>
            <Container component="main" maxWidth="sm" style={ { marginTop: '100px' } }>
                <Box boxShadow={4} style={ boxStyle }>
                    {/* Outlet is where login/register form will be rendered */}
                    <Outlet/>
                </Box>
                <br />
                <br />
                <Button variant="contained" onClick={() => { navigate('/') }}>Back to Home</Button>
            </Container>
        </>
  );
}
