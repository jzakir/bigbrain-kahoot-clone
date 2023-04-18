import React from 'react';
import { Box, Typography } from '@mui/material';

export default function AdminResult (props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h2' sx={{ fontWeight: 'bold', color: 'rgb(248,130,135)' }}>Game Finished!</Typography>
    </Box>
  )
}
