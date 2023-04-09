import React from 'react';
import { Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const boxStyle = {
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function LoginRegisterLayout () {
  return (
    <>
      <Container component="div" style={ {
        minHeight: '100vh',
        minWidth: '100vw',
        background: 'linear-gradient(203deg, rgba(207,136,255,1) 18%, rgba(255,99,99,1) 48%, rgba(255,200,123,1) 91%)',
        display: 'flex',
        alignItems: 'center'
      } }>
        <Container component="main" maxWidth="sm">
          <Box style={ boxStyle }>
              {/* Outlet is where login/register form will be rendered */}
              <Outlet/>
          </Box>
        </Container>
      </Container>
    </>
  );
}
