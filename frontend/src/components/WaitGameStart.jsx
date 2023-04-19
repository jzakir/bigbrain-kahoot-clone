import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Loading from '../layouts/Loading';

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#F7F7F2',
  padding: '40px',
  borderRadius: '2%'
});

export default function WaitGameStart (props) {
  return (
    <StyledBox {...props}>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Sit Tight! The game will start soon.
      </Typography>
      <Loading/>
    </StyledBox>
  )
}
