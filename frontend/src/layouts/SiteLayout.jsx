import React from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function SiteLayout () {
  return (
    <>
      <NavBar/>
      <Container component="div" style={ {
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column'
      } }>
        <Outlet/>
      </Container>
    </>
  );
}
