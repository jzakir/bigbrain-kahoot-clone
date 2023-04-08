import React from 'react';
import { Container, Box } from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';

const boxStyle = {
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function LoginRegisterLayout () {
  const navigate = useNavigate();

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
            <PrimaryButton
              variant="contained"
              onClick={() => { navigate('/') }}
              sx = { { alignSelf: 'flex-start', mt: 3 } }
            >
              Back to Home
            </PrimaryButton>
          </Box>
        </Container>
      </Container>
    </>
  );
}
