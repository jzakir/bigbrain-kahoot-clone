import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import WhiteBox from '../components/WhiteBox';
import GradientButton from '../components/GradientButton';

export default function PlayGameHome () {
  return (
    <WhiteBox>
      <Typography variant='h2' sx={{ fontWeight: 'bold' }}>Play A Game!</Typography>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
        <TextField label="Name" id="filled-basic" variant="filled" />
        <TextField label="Game PIN" id="filled-basic" variant="filled" />
        <GradientButton sx={{ mt: 3 }} >Join!</GradientButton>
      </Box>
    </WhiteBox>
  )
}
