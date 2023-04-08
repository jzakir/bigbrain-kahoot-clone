import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomePageButton from '../components/HomePageButton';
import { Typography, Box } from '@mui/material';

export default function HomePage () {
  const navigate = useNavigate();
  return (
    <>
      <Box sx = {{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          <Typography variant='h1' sx={ { color: '#2E3137', fontWeight: 'bold', fontStyle: 'italic' }}>BigBrain!</Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', minHeight: '100vh' }}>
          <HomePageButton onClick={() => { navigate('/login') }}>Admin (Manage/Create Games)</HomePageButton>
          <HomePageButton>Player (Join/Play Games)</HomePageButton>
        </div>
      </Box>
    </>
  );
}
